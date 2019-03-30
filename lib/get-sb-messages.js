const serviceBus = require('@azure/service-bus')
const armServiceBus = require('@azure/arm-servicebus')

// TODO: ? Send in sub id with required resources?
// Or just require all as parameterers?
module.exports = async (credentials, subscriptionId) => {
  try {  
    const sbMgmClient = new armServiceBus.ServiceBusManagementClient(
      credentials,
      subscriptionId
    )

    let ns = new armServiceBus.Namespaces(sbMgmClient)

    let ars = await ns.listAuthorizationRules('tfkdevtest', 'tfkdevtest')
    let ar = await ns.getAuthorizationRule('tfkdevtest', 'tfkdevtest', 'RootManageSharedAccessKey')
    let keys = await ns.listKeys('tfkdevtest', 'tfkdevtest', 'RootManageSharedAccessKey')
    console.log(ar)
    console.log(keys)

    serviceBus.Namespace.createFromConnectionString()
  } catch (error) {
    throw error
  }
}
