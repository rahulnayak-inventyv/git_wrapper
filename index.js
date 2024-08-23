let gitWrapper = require('./gc-git-wrapper.js')

gitWrapper.status("/home/rahul/Desktop/infra-tibdhistoryimporter").then((res) => {
    console.log(res);

}).catch((error) => {
    console.log("error::::>", error);

})