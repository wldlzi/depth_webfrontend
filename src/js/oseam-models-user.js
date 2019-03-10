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

OSeaM.models.User = Backbone.Model.extend({
    defaults: {
        user_name   : null,
        forname     : null,
        surname     : null,
        organisation: null,
        country     : null,
        language    : null,
        phone		: null
    },
    urlRoot: function() {
    	return OSeaM.apiUrl + 'users/current';
    }
});
