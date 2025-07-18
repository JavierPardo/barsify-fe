# .MenuApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**menuMenuCategoryPost**](MenuApi.md#menuMenuCategoryPost) | **POST** /Menu/menu-category | 
[**menuMenuItemPost**](MenuApi.md#menuMenuItemPost) | **POST** /Menu/menu-item | 
[**menuRestaurantIdGet**](MenuApi.md#menuRestaurantIdGet) | **GET** /Menu/{restaurantId} | 


# **menuMenuCategoryPost**
> void menuMenuCategoryPost()


### Example


```typescript
import { createConfiguration, MenuApi } from '';
import type { MenuApiMenuMenuCategoryPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MenuApi(configuration);

const request: MenuApiMenuMenuCategoryPostRequest = {
  
  createMenuCategoryCommand: {
    name: "name_example",
    order: 1,
    restaurantId: "restaurantId_example",
  },
};

const data = await apiInstance.menuMenuCategoryPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createMenuCategoryCommand** | **CreateMenuCategoryCommand**|  |


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

# **menuMenuItemPost**
> void menuMenuItemPost()


### Example


```typescript
import { createConfiguration, MenuApi } from '';
import type { MenuApiMenuMenuItemPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MenuApi(configuration);

const request: MenuApiMenuMenuItemPostRequest = {
  
  createMenuItemCommand: {
    menuCategoryId: "menuCategoryId_example",
    name: "name_example",
    description: "description_example",
    price: 3.14,
    imageUrl: "imageUrl_example",
    quantityAvailable: 1,
    isAvailable: true,
  },
};

const data = await apiInstance.menuMenuItemPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createMenuItemCommand** | **CreateMenuItemCommand**|  |


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

# **menuRestaurantIdGet**
> Array<MenuCategoryReadDto> menuRestaurantIdGet()


### Example


```typescript
import { createConfiguration, MenuApi } from '';
import type { MenuApiMenuRestaurantIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new MenuApi(configuration);

const request: MenuApiMenuRestaurantIdGetRequest = {
  
  restaurantId: "restaurantId_example",
};

const data = await apiInstance.menuRestaurantIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **restaurantId** | [**string**] |  | defaults to undefined


### Return type

**Array<MenuCategoryReadDto>**

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


