import { get } from "Ember";
import UserIndexRoute from "routes/UserIndexRoute";
import InfiniteScrollMixin from "mixins/InfiniteScrollMixin";
import RefreshRouteMixin from "mixins/RefreshRouteMixin";
import { mapBy } from "utils/ember/recordArrayMethods";
import preload from "utils/preload";


export default UserIndexRoute.extend( InfiniteScrollMixin, RefreshRouteMixin, {
	itemSelector: ".channel-item-component",

	queryParams: {
		sortby: {
			refreshModel: true
		},
		direction: {
			refreshModel: true
		}
	},

	modelName: "twitchChannelFollowed",

	model( params ) {
		return get( this, "store" ).query( this.modelName, {
			offset   : get( this, "offset" ),
			limit    : get( this, "limit" ),
			sortby   : params.sortby || "created_at",
			direction: params.direction || "desc"
		})
			.then( mapBy( "channel" ) )
			.then( preload( "logo" ) );
	},

	fetchContent() {
		return this.model({
			sortby   : get( this, "controller.sortby" ),
			direction: get( this, "controller.direction" )
		});
	}
});
