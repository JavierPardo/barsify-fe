# .RestaurantApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**restaurantGet**](RestaurantApi.md#restaurantGet) | **GET** /Restaurant | 
[**restaurantIdGet**](RestaurantApi.md#restaurantIdGet) | **GET** /Restaurant/{id} | 
[**restaurantPost**](RestaurantApi.md#restaurantPost) | **POST** /Restaurant | 
[**restaurantPut**](RestaurantApi.md#restaurantPut) | **PUT** /Restaurant | 
[**restaurantSucursalPost**](RestaurantApi.md#restaurantSucursalPost) | **POST** /Restaurant/sucursal | 


# **restaurantGet**
> Array<RestaurantViewModel> restaurantGet()


### Example


```typescript
import { createConfiguration, RestaurantApi } from '';

const configuration = createConfiguration();
const apiInstance = new RestaurantApi(configuration);

const request = {};

const data = await apiInstance.restaurantGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<RestaurantViewModel>**

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

# **restaurantIdGet**
> RestaurantViewModel restaurantIdGet()


### Example


```typescript
import { createConfiguration, RestaurantApi } from '';
import type { RestaurantApiRestaurantIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RestaurantApi(configuration);

const request: RestaurantApiRestaurantIdGetRequest = {
  
  id: "id_example",
};

const data = await apiInstance.restaurantIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**RestaurantViewModel**

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

# **restaurantPost**
> void restaurantPost()


### Example


```typescript
import { createConfiguration, RestaurantApi } from '';
import type { RestaurantApiRestaurantPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RestaurantApi(configuration);

const request: RestaurantApiRestaurantPostRequest = {
  
  createRestaurantCommand: {
    name: "name_example",
    description: "description_example",
    ownerId: "ownerId_example",
    sucursals: [
      {
        name: "name_example",
        address: "address_example",
        description: "description_example",
        phoneNumber: "phoneNumber_example",
        isOpen: true,
        openTime: {
          hour: 1,
          minute: 1,
        },
        closeTime: {
          hour: 1,
          minute: 1,
        },
        latitude: 3.14,
        longitude: 3.14,
      },
    ],
  },
};

const data = await apiInstance.restaurantPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createRestaurantCommand** | **CreateRestaurantCommand**|  |


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

# **restaurantPut**
> void restaurantPut()


### Example


```typescript
import { createConfiguration, RestaurantApi } from '';
import type { RestaurantApiRestaurantPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RestaurantApi(configuration);

const request: RestaurantApiRestaurantPutRequest = {
  
  updateRestaurantCommand: {
    id: "id_example",
    name: "name_example",
    description: "description_example",
    ownerId: "ownerId_example",
  },
};

const data = await apiInstance.restaurantPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRestaurantCommand** | **UpdateRestaurantCommand**|  |


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

# **restaurantSucursalPost**
> void restaurantSucursalPost()


### Example


```typescript
import { createConfiguration, RestaurantApi } from '';
import type { RestaurantApiRestaurantSucursalPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RestaurantApi(configuration);

const request: RestaurantApiRestaurantSucursalPostRequest = {
  
  createSucursalCommand: {
    name: "name_example",
    address: "address_example",
    description: "description_example",
    phoneNumber: "phoneNumber_example",
    isOpen: true,
    openTime: {
      hour: 1,
      minute: 1,
    },
    closeTime: {
      hour: 1,
      minute: 1,
    },
    latitude: 3.14,
    longitude: 3.14,
    restaurantId: "restaurantId_example",
  },
};

const data = await apiInstance.restaurantSucursalPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createSucursalCommand** | **CreateSucursalCommand**|  |


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


