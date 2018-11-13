import mockContext, { mockCollection } from "/imports/test-utils/helpers/mockContext";
import createSurchargeMutation from "./createSurcharge";


// Create mock context with FlatRateFulfillmentSurcharges collection
mockContext.collections.FlatRateFulfillmentSurcharges = mockCollection("FlatRateFulfillmentSurcharges");
mockContext.userHasPermission.mockReturnValueOnce(true);

test("add a surcharge", async () => {
  mockContext.collections.FlatRateFulfillmentSurcharges.insertOne.mockReturnValueOnce(Promise.resolve({}));

  const result = await createSurchargeMutation(mockContext, {
    _id: "surcharge123",
    shopId: "shop123",
    surcharge: {
      type: "surcharge",
      attributes: [
        { property: "vendor", value: "erik", propertyType: "string", operator: "eq" },
        { property: "productType", value: "knife", propertyType: "string", operator: "eq" }
      ],
      destination: { region: ["CO", "NY"] },
      surcharges: [
        {
          amount: "19.99",
          message: "You are shipping hazardous items, there is a 19.99 surcharge",
          reason: "An item meets a surcharge restriction"
        }
      ]
    }
  });

  expect(result).toEqual({
    surcharge: {
      type: "surcharge",
      attributes: [
        { property: "vendor", value: "erik", propertyType: "string", operator: "eq" },
        { property: "productType", value: "knife", propertyType: "string", operator: "eq" }
      ],
      destination: { region: ["CO", "NY"] },
      surcharges: [
        {
          amount: "19.99",
          message: "You are shipping hazardous items, there is a 19.99 surcharge",
          reason: "An item meets a surcharge restriction"
        }
      ]
    }
  });
});