const { WebhookClient } = require("dialogflow-fulfillment");

/**
 * mainChat
 * @async
 */
const mainChat = (request, response, next) => {
    try {
        //      _          _
        //     /_\   _____(_)__ _ _ _
        //    / _ \ (_-<_-< / _` | ' \
        //   /_/ \_\/__/__/_\__, |_||_|
        //                  |___/

        // Create an agent instance
        const agent = new WebhookClient({ request, response });
        const { queryResult } = request && request.body;
        console.log(JSON.stringify(queryResult));

        if (!queryResult) throw new Error("Missing queryResult");

        // Get parameters from Dialogflow webhook request
        const { parameters } = queryResult;
        console.log(parameters);

        //             _
        //     _ _ ___| |_ _  _ _ _ _ _
        //    | '_/ -_)  _| || | '_| ' \
        //    |_| \___|\__|\_,_|_| |_||_|

        /**
         * returnResponse
         * @param {Object} agent Dialogflow Agent
         * @param {Object} result { outputContexts and textResponses}
         */
        const returnResponse = (agent, result) => {
            // Result
            const { outputContexts, textResponses } = result;
            if (outputContexts && outputContexts.length) {
                outputContexts.map(outputContext =>
                    agent.context.set(outputContext)
                );
            }
            if (textResponses && textResponses.length) {
                textResponses.map(text => agent.add(text));
            }
        };

        //  _     _           _
        // (_)_ _| |_ ___ _ _| |_
        // | | ' \  _/ -_) ' \  _|
        // |_|_||_\__\___|_||_\__|
        //

        /**
         * commonCategoryQuery
         * @param {Object} agent Dialogflow Agent
         */
        const commonCategoryQuery = agent => {
            // const result = categoryQuery(parameters);
            // returnResponse(agent, result);
        };

        //  _     _           _   __  __
        // (_)_ _| |_ ___ _ _| |_|  \/  |__ _ _ __
        // | | ' \  _/ -_) ' \  _| |\/| / _` | '_ \
        // |_|_||_\__\___|_||_\__|_|  |_\__,_| .__/
        //                                   |_|

        // Run the proper function handler based on the matched Dialogflow intent name
        let intentMap = new Map();
        // Common
        intentMap.set("intent.welcome", commonCategoryQuery);

        agent.handleRequest(intentMap);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    mainChat
};
