import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { CreateMenuCategoryCommand } from '../models/CreateMenuCategoryCommand';
import { CreateMenuItemCommand } from '../models/CreateMenuItemCommand';
import { CreateOrderCommand } from '../models/CreateOrderCommand';
import { CreateOrderItemCommand } from '../models/CreateOrderItemCommand';
import { CreateOrderItemDto } from '../models/CreateOrderItemDto';
import { CreateRestaurantCommand } from '../models/CreateRestaurantCommand';
import { CreateSucursalCommand } from '../models/CreateSucursalCommand';
import { CreateSucursalDto } from '../models/CreateSucursalDto';
import { MenuCategoryReadDto } from '../models/MenuCategoryReadDto';
import { MenuItemReadDto } from '../models/MenuItemReadDto';
import { OrderItemStatus } from '../models/OrderItemStatus';
import { OrderItemType } from '../models/OrderItemType';
import { OrderItemViewModel } from '../models/OrderItemViewModel';
import { OrderStatus } from '../models/OrderStatus';
import { OrderType } from '../models/OrderType';
import { OrderViewModel } from '../models/OrderViewModel';
import { RestaurantViewModel } from '../models/RestaurantViewModel';
import { SucursalViewModel } from '../models/SucursalViewModel';
import { TimeOnly } from '../models/TimeOnly';
import { UpdateOrderCommand } from '../models/UpdateOrderCommand';
import { UpdateOrderItemCommand } from '../models/UpdateOrderItemCommand';
import { UpdateRestaurantCommand } from '../models/UpdateRestaurantCommand';

import { ObservableMenuApi } from "./ObservableAPI";
import { MenuApiRequestFactory, MenuApiResponseProcessor} from "../apis/MenuApi";

export interface MenuApiMenuMenuCategoryPostRequest {
    /**
     * 
     * @type CreateMenuCategoryCommand
     * @memberof MenuApimenuMenuCategoryPost
     */
    createMenuCategoryCommand?: CreateMenuCategoryCommand
}

export interface MenuApiMenuMenuItemPostRequest {
    /**
     * 
     * @type CreateMenuItemCommand
     * @memberof MenuApimenuMenuItemPost
     */
    createMenuItemCommand?: CreateMenuItemCommand
}

export interface MenuApiMenuRestaurantIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof MenuApimenuRestaurantIdGet
     */
    restaurantId: string
}

export class ObjectMenuApi {
    private api: ObservableMenuApi

    public constructor(configuration: Configuration, requestFactory?: MenuApiRequestFactory, responseProcessor?: MenuApiResponseProcessor) {
        this.api = new ObservableMenuApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public menuMenuCategoryPostWithHttpInfo(param: MenuApiMenuMenuCategoryPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.menuMenuCategoryPostWithHttpInfo(param.createMenuCategoryCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public menuMenuCategoryPost(param: MenuApiMenuMenuCategoryPostRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.menuMenuCategoryPost(param.createMenuCategoryCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public menuMenuItemPostWithHttpInfo(param: MenuApiMenuMenuItemPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.menuMenuItemPostWithHttpInfo(param.createMenuItemCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public menuMenuItemPost(param: MenuApiMenuMenuItemPostRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.menuMenuItemPost(param.createMenuItemCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public menuRestaurantIdGetWithHttpInfo(param: MenuApiMenuRestaurantIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<MenuCategoryReadDto>>> {
        return this.api.menuRestaurantIdGetWithHttpInfo(param.restaurantId,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public menuRestaurantIdGet(param: MenuApiMenuRestaurantIdGetRequest, options?: ConfigurationOptions): Promise<Array<MenuCategoryReadDto>> {
        return this.api.menuRestaurantIdGet(param.restaurantId,  options).toPromise();
    }

}

import { ObservableOrderApi } from "./ObservableAPI";
import { OrderApiRequestFactory, OrderApiResponseProcessor} from "../apis/OrderApi";

export interface OrderApiOrderGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderGet
     */
    sucursalId?: string
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof OrderApiorderGet
     */
    _from?: Date
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof OrderApiorderGet
     */
    to?: Date
    /**
     * 
     * Defaults to: undefined
     * @type OrderStatus
     * @memberof OrderApiorderGet
     */
    status?: OrderStatus
}

export interface OrderApiOrderIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderIdDelete
     */
    id: string
}

export interface OrderApiOrderIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderIdGet
     */
    id: string
}

export interface OrderApiOrderOrderItemIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderOrderItemIdDelete
     */
    id: string
}

export interface OrderApiOrderOrderItemIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderOrderItemIdGet
     */
    id: string
}

export interface OrderApiOrderOrderItemPostRequest {
    /**
     * 
     * @type CreateOrderItemCommand
     * @memberof OrderApiorderOrderItemPost
     */
    createOrderItemCommand?: CreateOrderItemCommand
}

export interface OrderApiOrderOrderItemPutRequest {
    /**
     * 
     * @type UpdateOrderItemCommand
     * @memberof OrderApiorderOrderItemPut
     */
    updateOrderItemCommand?: UpdateOrderItemCommand
}

export interface OrderApiOrderPostRequest {
    /**
     * 
     * @type CreateOrderCommand
     * @memberof OrderApiorderPost
     */
    createOrderCommand?: CreateOrderCommand
}

export interface OrderApiOrderPutRequest {
    /**
     * 
     * @type UpdateOrderCommand
     * @memberof OrderApiorderPut
     */
    updateOrderCommand?: UpdateOrderCommand
}

export interface OrderApiOrderStatusIdPutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderStatusIdPut
     */
    id: string
    /**
     * 
     * @type number
     * @memberof OrderApiorderStatusIdPut
     */
    body?: number
}

export interface OrderApiOrderStatusOrderItemIdPutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrderApiorderStatusOrderItemIdPut
     */
    id: string
    /**
     * 
     * @type number
     * @memberof OrderApiorderStatusOrderItemIdPut
     */
    body?: number
}

export class ObjectOrderApi {
    private api: ObservableOrderApi

    public constructor(configuration: Configuration, requestFactory?: OrderApiRequestFactory, responseProcessor?: OrderApiResponseProcessor) {
        this.api = new ObservableOrderApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public orderGetWithHttpInfo(param: OrderApiOrderGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<OrderViewModel>>> {
        return this.api.orderGetWithHttpInfo(param.sucursalId, param._from, param.to, param.status,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderGet(param: OrderApiOrderGetRequest = {}, options?: ConfigurationOptions): Promise<Array<OrderViewModel>> {
        return this.api.orderGet(param.sucursalId, param._from, param.to, param.status,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderIdDeleteWithHttpInfo(param: OrderApiOrderIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.orderIdDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderIdDelete(param: OrderApiOrderIdDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.orderIdDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderIdGetWithHttpInfo(param: OrderApiOrderIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<OrderViewModel>> {
        return this.api.orderIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderIdGet(param: OrderApiOrderIdGetRequest, options?: ConfigurationOptions): Promise<OrderViewModel> {
        return this.api.orderIdGet(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemIdDeleteWithHttpInfo(param: OrderApiOrderOrderItemIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.orderOrderItemIdDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemIdDelete(param: OrderApiOrderOrderItemIdDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.orderOrderItemIdDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemIdGetWithHttpInfo(param: OrderApiOrderOrderItemIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<OrderViewModel>> {
        return this.api.orderOrderItemIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemIdGet(param: OrderApiOrderOrderItemIdGetRequest, options?: ConfigurationOptions): Promise<OrderViewModel> {
        return this.api.orderOrderItemIdGet(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemPostWithHttpInfo(param: OrderApiOrderOrderItemPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<string>> {
        return this.api.orderOrderItemPostWithHttpInfo(param.createOrderItemCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemPost(param: OrderApiOrderOrderItemPostRequest = {}, options?: ConfigurationOptions): Promise<string> {
        return this.api.orderOrderItemPost(param.createOrderItemCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemPutWithHttpInfo(param: OrderApiOrderOrderItemPutRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<string>> {
        return this.api.orderOrderItemPutWithHttpInfo(param.updateOrderItemCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderOrderItemPut(param: OrderApiOrderOrderItemPutRequest = {}, options?: ConfigurationOptions): Promise<string> {
        return this.api.orderOrderItemPut(param.updateOrderItemCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderPostWithHttpInfo(param: OrderApiOrderPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<string>> {
        return this.api.orderPostWithHttpInfo(param.createOrderCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderPost(param: OrderApiOrderPostRequest = {}, options?: ConfigurationOptions): Promise<string> {
        return this.api.orderPost(param.createOrderCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderPutWithHttpInfo(param: OrderApiOrderPutRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<string>> {
        return this.api.orderPutWithHttpInfo(param.updateOrderCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderPut(param: OrderApiOrderPutRequest = {}, options?: ConfigurationOptions): Promise<string> {
        return this.api.orderPut(param.updateOrderCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderStatusIdPutWithHttpInfo(param: OrderApiOrderStatusIdPutRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.orderStatusIdPutWithHttpInfo(param.id, param.body,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderStatusIdPut(param: OrderApiOrderStatusIdPutRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.orderStatusIdPut(param.id, param.body,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderStatusOrderItemIdPutWithHttpInfo(param: OrderApiOrderStatusOrderItemIdPutRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.orderStatusOrderItemIdPutWithHttpInfo(param.id, param.body,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public orderStatusOrderItemIdPut(param: OrderApiOrderStatusOrderItemIdPutRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.orderStatusOrderItemIdPut(param.id, param.body,  options).toPromise();
    }

}

import { ObservableRestaurantApi } from "./ObservableAPI";
import { RestaurantApiRequestFactory, RestaurantApiResponseProcessor} from "../apis/RestaurantApi";

export interface RestaurantApiRestaurantGetRequest {
}

export interface RestaurantApiRestaurantIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RestaurantApirestaurantIdGet
     */
    id: string
}

export interface RestaurantApiRestaurantPostRequest {
    /**
     * 
     * @type CreateRestaurantCommand
     * @memberof RestaurantApirestaurantPost
     */
    createRestaurantCommand?: CreateRestaurantCommand
}

export interface RestaurantApiRestaurantPutRequest {
    /**
     * 
     * @type UpdateRestaurantCommand
     * @memberof RestaurantApirestaurantPut
     */
    updateRestaurantCommand?: UpdateRestaurantCommand
}

export interface RestaurantApiRestaurantSucursalPostRequest {
    /**
     * 
     * @type CreateSucursalCommand
     * @memberof RestaurantApirestaurantSucursalPost
     */
    createSucursalCommand?: CreateSucursalCommand
}

export class ObjectRestaurantApi {
    private api: ObservableRestaurantApi

    public constructor(configuration: Configuration, requestFactory?: RestaurantApiRequestFactory, responseProcessor?: RestaurantApiResponseProcessor) {
        this.api = new ObservableRestaurantApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public restaurantGetWithHttpInfo(param: RestaurantApiRestaurantGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<RestaurantViewModel>>> {
        return this.api.restaurantGetWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantGet(param: RestaurantApiRestaurantGetRequest = {}, options?: ConfigurationOptions): Promise<Array<RestaurantViewModel>> {
        return this.api.restaurantGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantIdGetWithHttpInfo(param: RestaurantApiRestaurantIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<RestaurantViewModel>> {
        return this.api.restaurantIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantIdGet(param: RestaurantApiRestaurantIdGetRequest, options?: ConfigurationOptions): Promise<RestaurantViewModel> {
        return this.api.restaurantIdGet(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantPostWithHttpInfo(param: RestaurantApiRestaurantPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.restaurantPostWithHttpInfo(param.createRestaurantCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantPost(param: RestaurantApiRestaurantPostRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.restaurantPost(param.createRestaurantCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantPutWithHttpInfo(param: RestaurantApiRestaurantPutRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.restaurantPutWithHttpInfo(param.updateRestaurantCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantPut(param: RestaurantApiRestaurantPutRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.restaurantPut(param.updateRestaurantCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantSucursalPostWithHttpInfo(param: RestaurantApiRestaurantSucursalPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.restaurantSucursalPostWithHttpInfo(param.createSucursalCommand,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public restaurantSucursalPost(param: RestaurantApiRestaurantSucursalPostRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.restaurantSucursalPost(param.createSucursalCommand,  options).toPromise();
    }

}
