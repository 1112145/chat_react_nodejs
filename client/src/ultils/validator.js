var url_validator = {

    isURL(string) {
        var pattern = /http/i;
        return (pattern.test(string));
    },

    isYouTubeLink(string) {
    	var pattern = /youtube.com/i;
    	return (pattern.test(string));
    }

}

export default {
    urlValidator: url_validator
}
