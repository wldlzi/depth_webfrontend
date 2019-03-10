// -------------------------------------------------------------------------------------------------
// OpenSeaMap Water Depth - Web frontend for depth data handling.
//
// Written in 2019 by Richard Kunzmann
//
// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighboring rights to this software to the public domain
// worldwide. This software is distributed without any warranty.
//
// You should have received a copy of the CC0 Public Domain Dedication along
// with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
// -------------------------------------------------------------------------------------------------

//RKu ++ new function "logon"

OSeaM.views.Logon = OSeaM.View.extend({
	
    initialize: function() {
    	var oldlocation = window.location.href;
        OSeaM.frontend.on('change:language', this.render, this);
        this.listenTo(this.model, 'change', this.render);

        var self = this;												//RKu: save this context

        if (OSeaM.frontend.getAuth().isAuthenticated() !== true){
        jQuery.ajax({
        	type: 'POST',
        	url: OSeaM.apiUrl + 'auth/login',
        	dataType: 'json',
        	data: {lastPage: oldlocation},						//RKu: just some data with no meaning
        	context: this,
        	xhrFields: {withCredentials:true},
        	success:function(data,success,jqXHR){
        		self.render;
        	},
        	error: function(jqXHR,textStatus,errorThrown){				//RKu: this function catches the loginForm after an access to a protected resource, as the server does redirected to it
        		var content = jqXHR.responseText;						//RKu: see JAVA EE6 Tutorial
        		self.$el.html(content);
        	},
        	complete:function(data){
        		self.render;
        	}
        })} else {this.model.fetch();}
    },
    
    render: function() {
        var usermodel = OSeaM.frontend.getUser();						//RKu:
        var language = OSeaM.frontend.getLanguage();
        var template = OSeaM.loadTemplate('wellcome-' + language);
        var content = $(template({
    		firstname	: usermodel.attributes.forname					//RKu: get first name of current user
			}));
        OSeaM.frontend.translate(content);
        this.$el.html(content);
        
        if (this.model.get('user_name') !== null){
        	if (OSeaM.frontend.getAuth().isAuthenticated() === true){
        	} else {
        		OSeaM.frontend.getAuth().setAuthenticated(true);
        		}
        }
        return this;
    }
});

//RKu --
