// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Event, WriteSetChange } from "@aptos-labs/ts-sdk";

export abstract class EventParser<Requires, Provides> {
  readonly kind = "event" as const;

  //! Required to preserve types in subclass
  protected __requires__!: Requires;
  protected __provides__!: Provides;

  abstract parse(ctx: Requires & Provides, event: Event): void;
}

export abstract class WritesetParser<Requires, Provides> {
  readonly kind = "writeset" as const;

  //! Required to preserve types in subclass
  protected __requires__!: Requires;
  protected __provides__!: Provides;

  abstract parse(ctx: Requires & Provides, change: WriteSetChange): void;
}

export type AnyParser = EventParser<any, any> | WritesetParser<any, any>;

type ParserRequires<T> =
  T extends EventParser<infer R, any>
    ? R
    : T extends WritesetParser<infer R, any>
      ? R
      : never;

type ParserProvides<T> =
  T extends EventParser<any, infer P>
    ? P
    : T extends WritesetParser<any, infer P>
      ? P
      : never;

type Merge<A, B> = Omit<A, keyof B> & B;

type InnerValidateParser<Parser, Context> = Parser extends AnyParser
  ? Context extends ParserRequires<Parser>
    ? Parser
    : {
        __error: "❌ Missing required context";
        required: ParserRequires<Parser>;
        provided: Context;
      }
  : never;

export type ValidateParsers<
  Parsers extends readonly AnyParser[],
  AccumContext = {},
> = Parsers extends [infer First, ...infer Rest]
  ? InnerValidateParser<First, AccumContext> extends { __error: string }
    ? InnerValidateParser<First, AccumContext>
    : First extends AnyParser
      ? Rest extends readonly AnyParser[]
        ? ValidateParsers<
            Rest,
            Merge<AccumContext, ParserProvides<First>>
          > extends { __error: string }
          ? ValidateParsers<Rest, Merge<AccumContext, ParserProvides<First>>>
          : [
              First,
              ...ValidateParsers<
                Rest,
                Merge<AccumContext, ParserProvides<First>>
              >,
            ]
        : [First]
      : never
  : [];

export type ContextOfParsers<
  Parsers extends readonly AnyParser[],
  Accum = {},
> = Parsers extends [infer First, ...infer Rest]
  ? First extends AnyParser
    ? Rest extends readonly AnyParser[]
      ? ContextOfParsers<Rest, Merge<Accum, ParserProvides<First>>>
      : Merge<Accum, ParserProvides<First>>
    : Accum
  : Accum;
