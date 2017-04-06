class PaymentStore extends Sunset.Service.Store {

    constructor() {
        super();
    }

    URLS = {
        LIST: '/manage-service/workSearch/list',
        DELETE: '/manage-service/workflow/update_del'
    }

    callbacks = {}

    removeById(taskId) {
        return $http({
            url: this.URLS.DELETE,
            type: 'POST',
            data: {
                taskIds: taskId
            }
        });
    }

}

export default new PaymentStore();