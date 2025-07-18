import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { MenuApiRequestFactory, MenuApiResponseProcessor} from "../apis/MenuApi";
export class ObservableMenuApi {
    private requestFactory: MenuApiRequestFactory;
    private responseProcessor: MenuApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: MenuApiRequestFactory,
        responseProcessor?: MenuApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new MenuApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new MenuApiResponseProcessor();
    }

    /**
     * @param [createMenuCategoryCommand]
     */
    public menuMenuCategoryPostWithHttpInfo(createMenuCategoryCommand?: CreateMenuCategoryCommand, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.menuMenuCategoryPost(createMenuCategoryCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.menuMenuCategoryPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createMenuCategoryCommand]
     */
    public menuMenuCategoryPost(createMenuCategoryCommand?: CreateMenuCategoryCommand, _options?: ConfigurationOptions): Observable<void> {
        return this.menuMenuCategoryPostWithHttpInfo(createMenuCategoryCommand, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [createMenuItemCommand]
     */
    public menuMenuItemPostWithHttpInfo(createMenuItemCommand?: CreateMenuItemCommand, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.menuMenuItemPost(createMenuItemCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.menuMenuItemPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createMenuItemCommand]
     */
    public menuMenuItemPost(createMenuItemCommand?: CreateMenuItemCommand, _options?: ConfigurationOptions): Observable<void> {
        return this.menuMenuItemPostWithHttpInfo(createMenuItemCommand, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param restaurantId
     */
    public menuRestaurantIdGetWithHttpInfo(restaurantId: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<MenuCategoryReadDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.menuRestaurantIdGet(restaurantId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.menuRestaurantIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param restaurantId
     */
    public menuRestaurantIdGet(restaurantId: string, _options?: ConfigurationOptions): Observable<Array<MenuCategoryReadDto>> {
        return this.menuRestaurantIdGetWithHttpInfo(restaurantId, _options).pipe(map((apiResponse: HttpInfo<Array<MenuCategoryReadDto>>) => apiResponse.data));
    }

}

import { OrderApiRequestFactory, OrderApiResponseProcessor} from "../apis/OrderApi";
export class ObservableOrderApi {
    private requestFactory: OrderApiRequestFactory;
    private responseProcessor: OrderApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: OrderApiRequestFactory,
        responseProcessor?: OrderApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new OrderApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new OrderApiResponseProcessor();
    }

    /**
     * @param [sucursalId]
     * @param [_from]
     * @param [to]
     * @param [status]
     */
    public orderGetWithHttpInfo(sucursalId?: string, _from?: Date, to?: Date, status?: OrderStatus, _options?: ConfigurationOptions): Observable<HttpInfo<Array<OrderViewModel>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderGet(sucursalId, _from, to, status, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [sucursalId]
     * @param [_from]
     * @param [to]
     * @param [status]
     */
    public orderGet(sucursalId?: string, _from?: Date, to?: Date, status?: OrderStatus, _options?: ConfigurationOptions): Observable<Array<OrderViewModel>> {
        return this.orderGetWithHttpInfo(sucursalId, _from, to, status, _options).pipe(map((apiResponse: HttpInfo<Array<OrderViewModel>>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public orderIdDeleteWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderIdDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public orderIdDelete(id: string, _options?: ConfigurationOptions): Observable<void> {
        return this.orderIdDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public orderIdGetWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<OrderViewModel>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderIdGet(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public orderIdGet(id: string, _options?: ConfigurationOptions): Observable<OrderViewModel> {
        return this.orderIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<OrderViewModel>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public orderOrderItemIdDeleteWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderOrderItemIdDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderOrderItemIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public orderOrderItemIdDelete(id: string, _options?: ConfigurationOptions): Observable<void> {
        return this.orderOrderItemIdDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public orderOrderItemIdGetWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<OrderViewModel>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderOrderItemIdGet(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderOrderItemIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public orderOrderItemIdGet(id: string, _options?: ConfigurationOptions): Observable<OrderViewModel> {
        return this.orderOrderItemIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<OrderViewModel>) => apiResponse.data));
    }

    /**
     * @param [createOrderItemCommand]
     */
    public orderOrderItemPostWithHttpInfo(createOrderItemCommand?: CreateOrderItemCommand, _options?: ConfigurationOptions): Observable<HttpInfo<string>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderOrderItemPost(createOrderItemCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderOrderItemPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createOrderItemCommand]
     */
    public orderOrderItemPost(createOrderItemCommand?: CreateOrderItemCommand, _options?: ConfigurationOptions): Observable<string> {
        return this.orderOrderItemPostWithHttpInfo(createOrderItemCommand, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * @param [updateOrderItemCommand]
     */
    public orderOrderItemPutWithHttpInfo(updateOrderItemCommand?: UpdateOrderItemCommand, _options?: ConfigurationOptions): Observable<HttpInfo<string>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderOrderItemPut(updateOrderItemCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderOrderItemPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [updateOrderItemCommand]
     */
    public orderOrderItemPut(updateOrderItemCommand?: UpdateOrderItemCommand, _options?: ConfigurationOptions): Observable<string> {
        return this.orderOrderItemPutWithHttpInfo(updateOrderItemCommand, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * @param [createOrderCommand]
     */
    public orderPostWithHttpInfo(createOrderCommand?: CreateOrderCommand, _options?: ConfigurationOptions): Observable<HttpInfo<string>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderPost(createOrderCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createOrderCommand]
     */
    public orderPost(createOrderCommand?: CreateOrderCommand, _options?: ConfigurationOptions): Observable<string> {
        return this.orderPostWithHttpInfo(createOrderCommand, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * @param [updateOrderCommand]
     */
    public orderPutWithHttpInfo(updateOrderCommand?: UpdateOrderCommand, _options?: ConfigurationOptions): Observable<HttpInfo<string>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderPut(updateOrderCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [updateOrderCommand]
     */
    public orderPut(updateOrderCommand?: UpdateOrderCommand, _options?: ConfigurationOptions): Observable<string> {
        return this.orderPutWithHttpInfo(updateOrderCommand, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusIdPutWithHttpInfo(id: string, body?: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderStatusIdPut(id, body, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderStatusIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusIdPut(id: string, body?: number, _options?: ConfigurationOptions): Observable<void> {
        return this.orderStatusIdPutWithHttpInfo(id, body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusOrderItemIdPutWithHttpInfo(id: string, body?: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.orderStatusOrderItemIdPut(id, body, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.orderStatusOrderItemIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [body]
     */
    public orderStatusOrderItemIdPut(id: string, body?: number, _options?: ConfigurationOptions): Observable<void> {
        return this.orderStatusOrderItemIdPutWithHttpInfo(id, body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { RestaurantApiRequestFactory, RestaurantApiResponseProcessor} from "../apis/RestaurantApi";
export class ObservableRestaurantApi {
    private requestFactory: RestaurantApiRequestFactory;
    private responseProcessor: RestaurantApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: RestaurantApiRequestFactory,
        responseProcessor?: RestaurantApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new RestaurantApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new RestaurantApiResponseProcessor();
    }

    /**
     */
    public restaurantGetWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<RestaurantViewModel>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.restaurantGet(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.restaurantGetWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public restaurantGet(_options?: ConfigurationOptions): Observable<Array<RestaurantViewModel>> {
        return this.restaurantGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<RestaurantViewModel>>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public restaurantIdGetWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<RestaurantViewModel>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.restaurantIdGet(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.restaurantIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public restaurantIdGet(id: string, _options?: ConfigurationOptions): Observable<RestaurantViewModel> {
        return this.restaurantIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<RestaurantViewModel>) => apiResponse.data));
    }

    /**
     * @param [createRestaurantCommand]
     */
    public restaurantPostWithHttpInfo(createRestaurantCommand?: CreateRestaurantCommand, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.restaurantPost(createRestaurantCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.restaurantPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createRestaurantCommand]
     */
    public restaurantPost(createRestaurantCommand?: CreateRestaurantCommand, _options?: ConfigurationOptions): Observable<void> {
        return this.restaurantPostWithHttpInfo(createRestaurantCommand, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [updateRestaurantCommand]
     */
    public restaurantPutWithHttpInfo(updateRestaurantCommand?: UpdateRestaurantCommand, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.restaurantPut(updateRestaurantCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.restaurantPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [updateRestaurantCommand]
     */
    public restaurantPut(updateRestaurantCommand?: UpdateRestaurantCommand, _options?: ConfigurationOptions): Observable<void> {
        return this.restaurantPutWithHttpInfo(updateRestaurantCommand, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [createSucursalCommand]
     */
    public restaurantSucursalPostWithHttpInfo(createSucursalCommand?: CreateSucursalCommand, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.restaurantSucursalPost(createSucursalCommand, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.restaurantSucursalPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createSucursalCommand]
     */
    public restaurantSucursalPost(createSucursalCommand?: CreateSucursalCommand, _options?: ConfigurationOptions): Observable<void> {
        return this.restaurantSucursalPostWithHttpInfo(createSucursalCommand, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}
