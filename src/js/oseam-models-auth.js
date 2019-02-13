// -------------------------------------------------------------------------------------------------
// OpenSeaMap Water Depth - Web frontend for depth data handling.
//
// Written in 2012 by Dominik Fässler dfa@bezono.org
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain
// worldwide. This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along
// with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
// -------------------------------------------------------------------------------------------------

OSeaM.models.Auth = Backbone.Model.extend({

    setAuthenticated: function(value) {
        this.set({
            authenticated : value
        });
        if (value === true) {
            this.trigger('loggedIn', this.get('username'));
        } else {
            this.trigger('loggedOut');
        }
    },
    
    isAuthenticated: function() {
        if (this.has('authenticated') && this.get('authenticated') === true) {
            return true;
        } else {
            return false;
        }
    },
    
    getUsername: function() {
        return this.get('username');
    },
    
    getCaptchaUrl: function() {
        return OSeaM.apiUrl + 'users/captcha';
    },
    
    create: function(params) {
        this.set({username : params.username});
        jQuery.ajax({
            type: 'POST',
            url: OSeaM.apiUrl + 'users',
            contentType: "application/x-www-form-urlencoded",
            data: params,
            context: this,
            xhrFields: {
                withCredentials: true
            },
            success: this.onCreateSuccess,
            error: this.onCreateError
        });
    },
    
    onCreateSuccess: function(data, success, jqXHR) {
        this.trigger('createSuccess', data);
//        this.setAuthenticated(true);
    },
    
    onCreateError: function(jqXHR, textStatus, errorThrown) {
        this.trigger('createFailure', jqXHR);
    },
    
    requestNewPassword: function(params) {
        jQuery.ajax({
            type: 'POST',
            url: OSeaM.apiUrl + 'users/reset',
            contentType: "application/x-www-form-urlencoded",
            data: params,
            context: this,
            xhrFields: {
                withCredentials: true
            },
            success: function(data){ this.trigger('passwordResetSuccess', data); },
            error: function(data){ this.trigger('passwordResetFailure', data); },
        });
    },
    
    login: function(params) {												//RKu: um zu sehen warum der Server nicht positiv antwortet
        this.set({username : params.username});								//RKu: muss das zusammen mit dem TomCat debugged werden

        jQuery.ajax({
            type: 'POST',
            url: OSeaM.apiUrl + 'auth/login',								//RKu: apiUrl: 'http://depth.openseamap.org/org.osm.depth.upload/api2/'
            dataType: 'json',												//RKu: Datatyp expected back from the server
            data: params,													//RKu: enthält username: "xxx.yyy@zzz.de" + password: "converted to MD5"
            context: this,
            xhrFields: {
                withCredentials: true
            },
            success: this.onLoginSuccess,
            error: this.onLoginError			// Original Zeile
//            error: this.onLoginSuccess			// RKu: nur zum Test: diese Zeile muss wieder raus.
        });
    },
    
    onLoginSuccess: function(data, success, jqXHR) {
        this.trigger('loginSuccess', data);								//RKu: the corresponding event handler does not jet exist
        this.setAuthenticated(true);
        OSeaM.frontend.startView('Wellcome');								//RKu: call OSeaM.views.Contact (new .js)
    },
    
    onLoginError: function(jqXHR, textStatus, errorThrown) {
        this.trigger('loginFailure', jqXHR);							//RKu: the corresponding event handler does not jet exist
        var elements = document.getElementById("oseam-1");					//RKu: {{idUsername}}
        elements.style.backgroundColor = '#FF4500';							//RKu:
        var elements = document.getElementById("oseam-2");					//RKu: {{idPassword}}
        elements.style.backgroundColor = '#FF4500';							//RKu:
        alert("Fehlermeldung von TomCat nach Login: " +jqXHR.status + " " + errorThrown + "\nBitte melde Dich ordentlich an, um diese Funktion zu nutzen.");	//RKu: vorübergehend
        window.location.reload();											//RKu: reload the frontend from the beginning
    },
    
    logout: function() {
        jQuery.ajax({
            type: 'POST',
            url: OSeaM.apiUrl + 'auth/logout',
            dataType: 'json',
            context: this,
            xhrFields: {
                withCredentials: true
            },
            success: this.onLogoutSuccess,
            error: this.onLogoutError			// Original Zeile
//            error: this.onLogoutSuccess			// RKu: nur zum Test: diese Zeile muss wieder raus.
        });
    },
    
    onLogoutSuccess: function(data, success, jqXHR) {
        this.trigger('logoutSuccess', data);
        this.setAuthenticated(false);
        OSeaM.frontend.startView('Goodby');									//RKu: call OSeaM.views.Contact (new .js)
    },
    
    onLogoutError: function(jqXHR, textStatus, errorThrown) {
        this.trigger('logoutFailure', jqXHR);
        alert("Fehlermeldung von TomCat nach Logout: "   +jqXHR.status + " " + errorThrown + "\nZur Sicherheit starte bitte Deinen Browser neu.");	//RKu: vorübergehend
        window.location.reload();											//RKu: reload the frontend from the beginning
    }
});
