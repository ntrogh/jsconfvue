# Azure Functions API

This project is an Azure Functions app, that responds to GET, POST, PUT, and DELETE endpoints for Koedos and Stats.
The data can be served from static sample data or can be retrieved from a Cosmos DB.

## Learn how

Learn how to [Publish an Angular, React, Svelte, or Vue JavaScript app and API with Azure Static Web Apps](https://docs.microsoft.com/en-us/learn/modules/publish-app-service-static-web-app-api/?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)

## Getting Started

1. To use static sample data, set the ```NO_DATABASE``` environment variable:

  - Static data: ```NO_DATABASE = true```
  - Cosmos DB: ```NO_DATABASE = false```

2. To connect to the Azure Cosmos DB, set the following environment variables (the values can be retrieved from the Azure management portal):

  - Cosmos DB endpoint URI: ```COSMOSDB_ENDPOINT```
  - Cosmos DB account key: ```COSMOSDB_KEY```

3. Run the app

   ```bash
   npm start
   ```

## Resources

- [Azure Free Trial](https://azure.microsoft.com/en-us/free/?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)
- [VS Code](https://code.visualstudio.com?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)
- [VS Code Extension for Node on Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)
- Azure Functions [local.settings.json](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#local-settings-file?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg) file

### Debugging Resources

- [Debugging Angular in VS Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)
- [Debugging React in VS Code](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)
- [Debugging Vue in VS Code](https://code.visualstudio.com/docs/nodejs/vuejs-tutorial?ocid=aid3015985_ThankYou_DevComm&eventId=JSConf.BE_1KFY26YyJEBg)
