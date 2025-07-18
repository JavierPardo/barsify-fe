# .OrderApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**orderGet**](OrderApi.md#orderGet) | **GET** /Order | 
[**orderIdDelete**](OrderApi.md#orderIdDelete) | **DELETE** /Order/{id} | 
[**orderIdGet**](OrderApi.md#orderIdGet) | **GET** /Order/{id} | 
[**orderOrderItemIdDelete**](OrderApi.md#orderOrderItemIdDelete) | **DELETE** /Order/order-item/{id} | 
[**orderOrderItemIdGet**](OrderApi.md#orderOrderItemIdGet) | **GET** /Order/order-item/{id} | 
[**orderOrderItemPost**](OrderApi.md#orderOrderItemPost) | **POST** /Order/order-item | 
[**orderOrderItemPut**](OrderApi.md#orderOrderItemPut) | **PUT** /Order/order-item | 
[**orderPost**](OrderApi.md#orderPost) | **POST** /Order | 
[**orderPut**](OrderApi.md#orderPut) | **PUT** /Order | 
[**orderStatusIdPut**](OrderApi.md#orderStatusIdPut) | **PUT** /Order/status/{id} | 
[**orderStatusOrderItemIdPut**](OrderApi.md#orderStatusOrderItemIdPut) | **PUT** /Order/status/order-item/{id} | 


# **orderGet**
> Array<OrderViewModel> orderGet()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderGetRequest = {
  
  sucursalId: "SucursalId_example",
  
  _from: new Date('1970-01-01T00:00:00.00Z'),
  
  to: new Date('1970-01-01T00:00:00.00Z'),
  
  status: 0,
};

const data = await apiInstance.orderGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sucursalId** | [**string**] |  | (optional) defaults to undefined
 **_from** | [**Date**] |  | (optional) defaults to undefined
 **to** | [**Date**] |  | (optional) defaults to undefined
 **status** | **OrderStatus** |  | (optional) defaults to undefined


### Return type

**Array<OrderViewModel>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderIdDelete**
> void orderIdDelete()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderIdDeleteRequest = {
  
  id: "id_example",
};

const data = await apiInstance.orderIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderIdGet**
> OrderViewModel orderIdGet()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderIdGetRequest = {
  
  id: "id_example",
};

const data = await apiInstance.orderIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**OrderViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderOrderItemIdDelete**
> void orderOrderItemIdDelete()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderOrderItemIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderOrderItemIdDeleteRequest = {
  
  id: "id_example",
};

const data = await apiInstance.orderOrderItemIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderOrderItemIdGet**
> OrderViewModel orderOrderItemIdGet()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderOrderItemIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderOrderItemIdGetRequest = {
  
  id: "id_example",
};

const data = await apiInstance.orderOrderItemIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**OrderViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderOrderItemPost**
> string orderOrderItemPost()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderOrderItemPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderOrderItemPostRequest = {
  
  createOrderItemCommand: {
    quantity: 1,
    type: 0,
    status: 0,
    orderId: "orderId_example",
    menuItemId: "menuItemId_example",
    notes: "notes_example",
  },
};

const data = await apiInstance.orderOrderItemPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createOrderItemCommand** | **CreateOrderItemCommand**|  |


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderOrderItemPut**
> string orderOrderItemPut()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderOrderItemPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderOrderItemPutRequest = {
  
  updateOrderItemCommand: {
    id: "id_example",
    quantity: 1,
    type: 0,
    status: 0,
    orderId: "orderId_example",
    menuItemId: "menuItemId_example",
    notes: "notes_example",
  },
};

const data = await apiInstance.orderOrderItemPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateOrderItemCommand** | **UpdateOrderItemCommand**|  |


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderPost**
> string orderPost()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderPostRequest = {
  
  createOrderCommand: {
    customerId: "customerId_example",
    orderType: 0,
    tableNumber: 1,
    deliveryAddress: "deliveryAddress_example",
    items: [
      {
        quantity: 1,
        type: 0,
        status: 0,
        menuItemId: "menuItemId_example",
        notes: "notes_example",
      },
    ],
    isPaid: true,
    status: 0,
    approvedByAdmin: true,
    sucursalId: "sucursalId_example",
  },
};

const data = await apiInstance.orderPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createOrderCommand** | **CreateOrderCommand**|  |


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderPut**
> string orderPut()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderPutRequest = {
  
  updateOrderCommand: {
    id: "id_example",
    customerId: "customerId_example",
    orderType: 0,
    tableNumber: 1,
    deliveryAddress: "deliveryAddress_example",
    isPaid: true,
    status: 0,
    approvedByAdmin: true,
    sucursalId: "sucursalId_example",
  },
};

const data = await apiInstance.orderPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateOrderCommand** | **UpdateOrderCommand**|  |


### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderStatusIdPut**
> void orderStatusIdPut()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderStatusIdPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderStatusIdPutRequest = {
  
  id: "id_example",
  
  body: 0,
};

const data = await apiInstance.orderStatusIdPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **number**|  |
 **id** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **orderStatusOrderItemIdPut**
> void orderStatusOrderItemIdPut()


### Example


```typescript
import { createConfiguration, OrderApi } from '';
import type { OrderApiOrderStatusOrderItemIdPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrderApi(configuration);

const request: OrderApiOrderStatusOrderItemIdPutRequest = {
  
  id: "id_example",
  
  body: 0,
};

const data = await apiInstance.orderStatusOrderItemIdPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **number**|  |
 **id** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


