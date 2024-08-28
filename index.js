let gitWrapper = require('./gc-git-wrapper.js')

gitWrapper.status("/home/rahul/Desktop/Rust_code/git_wrapper_rust").then((res) => {
    console.log(res);

}).catch((error) => {
    console.log("error::::>", error);

})