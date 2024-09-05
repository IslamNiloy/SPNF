const { Client } = require('@hubspot/api-client');


/**
 * Creates properties in HubSpot.
 * 
 * @param {string} accessToken - The access token for HubSpot API authentication.
 */
async function createProperties(accessToken) {
  const hubspotClient = new Client({ accessToken });

  const propertiesToCreate = [
    {
      hidden: false,
      displayOrder: -1,
      description: "This property created for to store the quality of phone number",
      label: "PF-Number Quality",
      type: "string",
      formField: false,
      groupName: "contactinformation",
      name: "pf_number_quality_14082001",
      fieldType: "text",
    },
    {
      hidden: false,
      displayOrder: -1,
      description: "This property created for to store the formatted phone number",
      label: "PF-Formated Phone Number",
      type: "string",
      formField: false,
      groupName: "contactinformation",
      name: "pf_formated_phone_number_14082001",
      fieldType: "text",
    }
  ];

  const objectType = "contacts";

  try {
    for (const property of propertiesToCreate) {
      const apiResponse = await hubspotClient.crm.properties.coreApi.create(objectType, property);
      console.log(`Property ${property.name} created:`, JSON.stringify(apiResponse, null, 2));
    }
  } catch (e) {
    if (e.message === 'HTTP request failed') {
      console.error(JSON.stringify(e.response, null, 2));
    } else {
      console.error(e);
    }
  }
}

module.exports = {createProperties};
