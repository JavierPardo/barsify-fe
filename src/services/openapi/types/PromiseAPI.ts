import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, PromiseConfigurationOptions, wrapOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

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
import { ObservableMenuApi } from './ObservableAPI';

import { MenuApiRequestFactory, MenuApiResponseProcessor} from "../apis/MenuApi";
export class PromiseMenuApi {
    private api: ObservableMenuApi

    public constructor(
        configuration: Configuration,
        requestFactory?: MenuApiRequestFactory,
        responseProcessor?: MenuApiResponseProcessor
    ) {
        this.api = new ObservableMenuApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [createMenuCategoryCommand]
     */
    public menuMenuCategoryPostWithHttpInfo(createMenuCategoryCommand?: CreateMenuCategoryCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.menuMenuCategoryPostWithHttpInfo(createMenuCategoryCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createMenuCategoryCommand]
     */
    public menuMenuCategoryPost(createMenuCategoryCommand?: CreateMenuCategoryCommand, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.menuMenuCategoryPost(createMenuCategoryCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createMenuItemCommand]
     */
    public menuMenuItemPostWithHttpInfo(createMenuItemCommand?: CreateMenuItemCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.menuMenuItemPostWithHttpInfo(createMenuItemCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createMenuItemCommand]
     */
    public menuMenuItemPost(createMenuItemCommand?: CreateMenuItemCommand, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.menuMenuItemPost(createMenuItemCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param restaurantId
     */
    public menuRestaurantIdGetWithHttpInfo(restaurantId: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<MenuCategoryReadDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.menuRestaurantIdGetWithHttpInfo(restaurantId, observableOptions);
        return result.toPromise();
    }

    /**
     * @param restaurantId
     */
    public menuRestaurantIdGet(restaurantId: string, _options?: PromiseConfigurationOptions): Promise<Array<MenuCategoryReadDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.menuRestaurantIdGet(restaurantId, observableOptions);
        return result.toPromise();
    }


}



import { ObservableOrderApi } from './ObservableAPI';

import { OrderApiRequestFactory, OrderApiResponseProcessor} from "../apis/OrderApi";
export class PromiseOrderApi {
    private api: ObservableOrderApi

    public constructor(
        configuration: Configuration,
        requestFactory?: OrderApiRequestFactory,
        responseProcessor?: OrderApiResponseProcessor
    ) {
        this.api = new ObservableOrderApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [sucursalId]
     * @param [_from]
     * @param [to]
     * @param [status]
     */
    public orderGetWithHttpInfo(sucursalId?: string, _from?: Date, to?: Date, status?: OrderStatus, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<OrderViewModel>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderGetWithHttpInfo(sucursalId, _from, to, status, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [sucursalId]
     * @param [_from]
     * @param [to]
     * @param [status]
     */
    public orderGet(sucursalId?: string, _from?: Date, to?: Date, status?: OrderStatus, _options?: PromiseConfigurationOptions): Promise<Array<OrderViewModel>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderGet(sucursalId, _from, to, status, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderIdDeleteWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderIdDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderIdDelete(id: string, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderIdDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderIdGetWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<OrderViewModel>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderIdGetWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderIdGet(id: string, _options?: PromiseConfigurationOptions): Promise<OrderViewModel> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderIdGet(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderOrderItemIdDeleteWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemIdDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderOrderItemIdDelete(id: string, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemIdDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderOrderItemIdGetWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<OrderViewModel>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemIdGetWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public orderOrderItemIdGet(id: string, _options?: PromiseConfigurationOptions): Promise<OrderViewModel> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemIdGet(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createOrderItemCommand]
     */
    public orderOrderItemPostWithHttpInfo(createOrderItemCommand?: CreateOrderItemCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemPostWithHttpInfo(createOrderItemCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createOrderItemCommand]
     */
    public orderOrderItemPost(createOrderItemCommand?: CreateOrderItemCommand, _options?: PromiseConfigurationOptions): Promise<string> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemPost(createOrderItemCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateOrderItemCommand]
     */
    public orderOrderItemPutWithHttpInfo(updateOrderItemCommand?: UpdateOrderItemCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemPutWithHttpInfo(updateOrderItemCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateOrderItemCommand]
     */
    public orderOrderItemPut(updateOrderItemCommand?: UpdateOrderItemCommand, _options?: PromiseConfigurationOptions): Promise<string> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderOrderItemPut(updateOrderItemCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createOrderCommand]
     */
    public orderPostWithHttpInfo(createOrderCommand?: CreateOrderCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderPostWithHttpInfo(createOrderCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createOrderCommand]
     */
    public orderPost(createOrderCommand?: CreateOrderCommand, _options?: PromiseConfigurationOptions): Promise<string> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderPost(createOrderCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateOrderCommand]
     */
    public orderPutWithHttpInfo(updateOrderCommand?: UpdateOrderCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderPutWithHttpInfo(updateOrderCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateOrderCommand]
     */
    public orderPut(updateOrderCommand?: UpdateOrderCommand, _options?: PromiseConfigurationOptions): Promise<string> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderPut(updateOrderCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusIdPutWithHttpInfo(id: string, body?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderStatusIdPutWithHttpInfo(id, body, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusIdPut(id: string, body?: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderStatusIdPut(id, body, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusOrderItemIdPutWithHttpInfo(id: string, body?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderStatusOrderItemIdPutWithHttpInfo(id, body, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusOrderItemIdPut(id: string, body?: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.orderStatusOrderItemIdPut(id, body, observableOptions);
        return result.toPromise();
    }


}



import { ObservableRestaurantApi } from './ObservableAPI';

import { RestaurantApiRequestFactory, RestaurantApiResponseProcessor} from "../apis/RestaurantApi";
export class PromiseRestaurantApi {
    private api: ObservableRestaurantApi

    public constructor(
        configuration: Configuration,
        requestFactory?: RestaurantApiRequestFactory,
        responseProcessor?: RestaurantApiResponseProcessor
    ) {
        this.api = new ObservableRestaurantApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public restaurantGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<RestaurantViewModel>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public restaurantGet(_options?: PromiseConfigurationOptions): Promise<Array<RestaurantViewModel>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantGet(observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public restaurantIdGetWithHttpInfo(id: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<RestaurantViewModel>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantIdGetWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public restaurantIdGet(id: string, _options?: PromiseConfigurationOptions): Promise<RestaurantViewModel> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantIdGet(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createRestaurantCommand]
     */
    public restaurantPostWithHttpInfo(createRestaurantCommand?: CreateRestaurantCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantPostWithHttpInfo(createRestaurantCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createRestaurantCommand]
     */
    public restaurantPost(createRestaurantCommand?: CreateRestaurantCommand, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantPost(createRestaurantCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateRestaurantCommand]
     */
    public restaurantPutWithHttpInfo(updateRestaurantCommand?: UpdateRestaurantCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantPutWithHttpInfo(updateRestaurantCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateRestaurantCommand]
     */
    public restaurantPut(updateRestaurantCommand?: UpdateRestaurantCommand, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantPut(updateRestaurantCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createSucursalCommand]
     */
    public restaurantSucursalPostWithHttpInfo(createSucursalCommand?: CreateSucursalCommand, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantSucursalPostWithHttpInfo(createSucursalCommand, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createSucursalCommand]
     */
    public restaurantSucursalPost(createSucursalCommand?: CreateSucursalCommand, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.restaurantSucursalPost(createSucursalCommand, observableOptions);
        return result.toPromise();
    }


}



