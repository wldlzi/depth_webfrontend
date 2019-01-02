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

OSeaM.views.Login = OSeaM.View.extend({
    render: function() {
//RKu+        var template = OSeaM.loadTemplate('alert-info');
        var template = OSeaM.loadTemplate('alert');						//RKu-        
        this.renderParams =  {
            title : '1009:Sign in!',
            msg   : '1032:Please sign in proper to use this part.'
        };
        var content = $(template(this.renderParams));
        OSeaM.frontend.translate(content);
//RKu        this.$el.html(content);
        this.$el.find('legend').after(content);
        return this;
    }
});
