// A helper to handle date time feature.
var tick_tock = {

    getTime: function() {
        var d = new Date();
        return this.formatDate(d);
    },

    formatDate: function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    },

    generateUUID() {
        //https://jsfiddle.net/briguy37/2MVFd/
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

}

var session_storage = {

    storeObject: function(key,obj){
        var jsonString = JSON.stringify(obj);
        sessionStorage.setItem(key, jsonString);
    },

    getObject: function(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

}

var url_helper = {

    getYouTubeId: function(youtube_url) {
        // reference: http://stackoverflow.com/questions/10591547/how-to-get-youtube-video-id-from-url
        var video_id = youtube_url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        return (video_id == null) ? '' : video_id[1];
    }
}

export default {
    Date: tick_tock,
    urlHelper: url_helper,
    sessionStorage: session_storage
};
