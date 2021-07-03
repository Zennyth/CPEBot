const { checkArguments, checkUser } = require("../validators/commandsValidators")



const tabCmds = [
    {
        command: "$galeriens",
        validators: [checkArguments, checkUser],
        function: () => {

        }
    },
    {
        command: "$modules",
        validators: [checkArguments, checkUser],
        function: () => {
            
        }
    },
    {
        command: "$grades",
        validators: [checkArguments, checkUser],
        function: () => {
            
        }
    },
    {
        command: "$newGrades",
        validators: [checkArguments, checkUser],
        function: () => {
            
        }
    }
]

module.exports = tabCmds