import { defineStore } from "pinia";
import Apis from "../utils/apis";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      kkcpAdminToken: null,
    };
  },
});

export const useCommonStore = defineStore("common", {
  state: () => {
    return {
      questionTypes: [],
      questionLevels: [],
      contestTypes: [],
      contestStatuses: [],
    };
  },
  getters: {
    getQuestionTypeById: (state) => {
      return (typeId) =>
        state.questionTypes.find((type) => type.id == typeId);
    },
    getQuestionLevelById: (state) => {
      return (levelId) =>
        state.questionLevels.find((level) => level.id == levelId);
    },
    getContestTypeById: (state) => {
      return (typeId) => state.contestTypes.find((type) => type.id == typeId)
    }
  },
});

export const useContestStore = defineStore("contests", {
  state: () => {
    return {
      init: false,
      data: [],
    };
  },
  getters: {
    getContestById: (state) => {
      return (contestId) => state.data.find((item) => item.contest.contestId == contestId);
    }
  },
  actions: {
    async refreshData() {
      this.init = false
      this.data = []
      return this.initData()
    },
    async initData() {
      return Apis.ContestModule.queryAllContest().then(body => {
        if (body.status) {
          this.init = true
          this.data = body.data
        }
      })
    },
    async ensureInit() {
      if (!this.init) {
        return this.initData();
      }
    }
  }
});

export const useQuestionsStore = defineStore("questions", {
  state: () => ({
    init: false,
    data: [],
  }),
  actions: {
    async refreshData() {
      this.init = false
      this.data = []
      return this.initData()
    },
    async initData() {
      return Apis.QuestionModule.queryQuestions().then((body) => {
        if (body.status) {
          this.data = body.data;
          this.init = true;
        }
      })
    },
    async ensureInit() {
      if (!this.init) {
        return this.initData();
      }
    }
  }
});
