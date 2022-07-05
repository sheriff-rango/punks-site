import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { getUnixTimeStamp } from "../utils/date";
import getQuery from "../utils/useAxios";

const TOKEN_ID = {
  juno: "juno-network",
  punk: "gan-punks",
};

export type TokenPriceType = {
  punk: any;
  juno: any;
};

export type TokenHistoryItemType = {
  label: string;
  value: number;
};

export enum TokenHistoryPeriod {
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
}

export type TokenPricesType = {
  current: TokenPriceType;
  previous: TokenPriceType;
  priceHistory: TokenHistoryItemType[];
  historyOption: {
    historyPeriod: TokenHistoryPeriod;
    priceType: "juno" | "punk";
  };
};

const getFromFunctions: { [key: number]: () => number } = {
  [TokenHistoryPeriod.DAILY]: () =>
    new Date().setDate(new Date().getDate() - 1),
  [TokenHistoryPeriod.WEEKLY]: () =>
    new Date().setDate(new Date().getDate() - 7),
  [TokenHistoryPeriod.MONTHLY]: () =>
    new Date().setMonth(new Date().getMonth() - 1),
  [TokenHistoryPeriod.YEARLY]: () =>
    new Date().setFullYear(new Date().getFullYear() - 1),
};

let initialState: TokenPricesType = {
  current: { punk: null, juno: null },
  previous: { punk: null, juno: null },
  priceHistory: [],
  historyOption: {
    historyPeriod: TokenHistoryPeriod.WEEKLY,
    priceType: "punk",
  },
};

export const fetchTokenPrices = createAsyncThunk(
  "tokenPrices/fetchTokenPrice",
  async () => {
    const now = moment(new Date()).format("YYYY-MM-DD");
    const yesterday = moment(new Date().setDate(new Date().getDate() - 1));
    const currentPunkPrice = await getQuery(
      `https://api.coingecko.com/api/v3/coins/${TOKEN_ID.punk}?date=${now}`
    );
    const currentJunoPrice = await getQuery(
      `https://api.coingecko.com/api/v3/coins/${TOKEN_ID.juno}?date=${now}`
    );

    const previousPunkPrice = await getQuery(
      `https://api.coingecko.com/api/v3/coins/${TOKEN_ID.punk}?date=${yesterday}`
    );
    const previousJunoPrice = await getQuery(
      `https://api.coingecko.com/api/v3/coins/${TOKEN_ID.juno}?date=${yesterday}`
    );
    return {
      current: {
        juno: currentJunoPrice,
        punk: currentPunkPrice,
      },
      previous: {
        juno: previousJunoPrice,
        punk: previousPunkPrice,
      },
    };
  }
);

export const fetchTokenPriceHistory = createAsyncThunk(
  "tokenPrices/fetchTokenPriceHistory",
  async ({
    period,
    token,
  }: {
    period: TokenHistoryPeriod;
    token: "juno" | "punk";
  }) => {
    let from: number = getFromFunctions[period]();

    const getLink = `https://api.coingecko.com/api/v3/coins/${
      TOKEN_ID[token]
    }/market_chart/range?vs_currency=usd&from=${getUnixTimeStamp(
      from
    )}&to=${getUnixTimeStamp(new Date())}`;
    const historyResult = await getQuery(getLink);
    const priceHistory = historyResult.prices;
    return priceHistory.map((historyItem: any) => ({
      label: moment(new Date(historyItem[0])).format("YYYY-MM-DD hh:mm"),
      value: historyItem[1],
    }));
  }
);

export const tokenPricesSlice = createSlice({
  name: "tokenPrices",
  initialState,
  reducers: {
    clearTokenPrice: (state, action: PayloadAction) => {
      state.current = { punk: null, juno: null };
      state.previous = { punk: null, juno: null };
      state.priceHistory = [];
    },
    setHistoryOption: (
      state,
      action: PayloadAction<{
        historyPeriod: TokenHistoryPeriod;
        priceType: "juno" | "punk";
      }>
    ) => {
      state.historyOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenPrices.fulfilled, (state, action) => {
      const { current, previous } = action.payload;
      state.current = current;
      state.previous = previous;
    });
    builder.addCase(fetchTokenPriceHistory.fulfilled, (state, action) => {
      state.priceHistory = action.payload;
    });
  },
});

export const { clearTokenPrice } = tokenPricesSlice.actions;

export default tokenPricesSlice.reducer;
