import { CollectionRef, Query } from './firestoreTypes'
import { Ref } from '@vue/composition-api'

export interface OptionsBase<T, M> {
  /** Path to the document or collection in firestore. Use $variableName to insert reactive variable data into the path. If the path includes variables, the options object must include a 'variables' key */
  path: string
  /** Variables that should be used to construct the path to the document or collection in firestore. If a variable changes the path, data will be re-fetched. Variable values should be a vue ref. */
  variables?: {
    [key: string]: Ref<string | number>
  }
  /** The debounce amount in milliseconds that should be waited between a path change and getting the data from firestore. Useful to change if a variable is bound to a text input. Defaults to 200 */
  debounce?: number
  /** The initial state of the loading return value. Defaults to true. Setting to false could be helpful in manual mode */
  initialLoading?: boolean
  /** When in manual mode, data will not automatically be fetched or watched initially or on path change. It will be up to you to call the getData or watchData function. */
  manual?: boolean
  /** exposes a function to customise error handling. Defaults to console.error(e) */
  onError?: (e: any) => any
}

export interface OptionsColl<T, M> {
  /** The type of this query - collection or doc */
  queryType: 'collection'
  /** Exposes a function to extend the firestore query for the collection eg: add a '.where()' function or '.limit()'. The returned Query object will be used to get or watch data */
  query?: (CollectionRef: CollectionRef) => Query
  /** Exposes a function to mutate the data that is fetched from firestore. The mutated data will be returned as 'mutatedData' */
  mutate?: (data: T[]) => M
  /** Exposes a hook for when a collection is received. Provides access to the received data and mutated data */
  onReceive?: (data: T[], mutatedData: M | undefined) => any
}

export interface OptionsDoc<T, M> {
  /** The type of this query - collection or doc */
  queryType: 'doc'
  /** Exposes a function to mutate the data that is fetched from firestore. The mutated data will be returned as 'mutatedData' */
  mutate?: (data: T | undefined) => M
  /** Exposes a hook for when a doc is received. Provides access to the received and mutated received data */
  onReceive?: (data: T | undefined, mutatedData: M | undefined) => any
}

export interface OptionsWatch {
  /** The type of the get function - 'watch' or 'get'. 'get' does a single get() from firestore | 'watch' watches for document or collection changes and updates the data received */
  type: 'watch'
}

export interface OptionsGet {
  /** The type of the get function - 'watch' or 'get'. 'get' does a single get() from firestore | 'watch' watches for document or collection changes and updates the data received */
  type: 'get'
}

export type OptionsCollWatch<T, M> = OptionsBase<T, M> & OptionsColl<T, M> & OptionsWatch
export type OptionsCollGet<T, M> = OptionsBase<T, M> & OptionsColl<T, M> & OptionsGet
export type OptionsDocWatch<T, M> = OptionsBase<T, M> & OptionsDoc<T, M> & OptionsGet
export type OptionsDocGet<T, M> = OptionsBase<T, M> & OptionsDoc<T, M> & OptionsWatch

export type Options<T, M = T> =
  | OptionsCollWatch<T, M>
  | OptionsCollGet<T, M>
  | OptionsDocGet<T, M>
  | OptionsDocWatch<T, M>