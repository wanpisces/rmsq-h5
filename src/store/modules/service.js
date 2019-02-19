
const service = {
    state: {
        service: {
            curIndex:0,
            classfiyData:{
                'text':'请选择',
                'id':0
            }
        },
        
    },
    mutations: {
        CUR_INDEX: (state, data) => {
            state.service.curIndex = data.curIndex;
            state.service.classfiyData = {
                'text':'请选择',
                'id':0
            }
        },
        SET_CLASSFIY:(state, data) => {
            state.service.classfiyData = data;
        },
    },
    actions: {
        tabSwitch({ commit },data) {
            commit("CUR_INDEX", data);
        },
        classfiyData({ commit },data){
            commit("SET_CLASSFIY", data);
        }
    }
};
export default service;