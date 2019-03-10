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
//    	localStorage.oldlocation = window.location.href;
        OSeaM.frontend.on('change:language', this.render, this);
        this.listenTo(this.model, 'change', this.render);

        var self = this;												//RKu: save this context
        
        this.model.fetch({												//RKu: model = OSeaM.frontend.getUser()
//        	contentType: "application/x-www-form-urlencoded; charset=UTF-8",	//RKu: all ajax settings are possible
//        	dataType: "json",
//        	success: function(model,response,options){
//        		self.render;
//        	},
        	
        	error: function(model,response,options){					//RKu: this function catches the loginForm after an access to a protected resource, as the server does redirected to it
        		var content = options.xhr.responseText;					//RKu: see JAVA EE6 Tutorial
        		self.$el.html(content);
        	}
        });
//		window.setTimeout(function(){alert('Huuu huu')}, 2000);
    },
    
    render: function() {
//    	if (window.location.href !== localStorage.oldlocation){window.history.back();}	//oder window.location.replace(localStorage.oldlocation)
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
