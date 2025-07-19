import type Cion from '@taiyakihitotsu/cion'
import * as foxp from '../../src/index'
import { describe, it, expect } from 'vitest'

// [note]
//
// see (re-find of Cion)[https://github.com/taiyakihitotsu/cion/blob/main/test/re-find.ts] as well

type email = `'(([^<>()[\\].,;: @"]+(\\.[^<>()[\\].,;: @"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))'`
const test_refind0 : Cion.Lisp<`(re-find ${email} 'zzz.zzz@testmailreg.com')`> = `'zzz.zzz@testmailreg.com'`
const test_refind1 : Cion.Lisp<`(re-find ${email} 'https://github.com/taiyakihitotsu/foxp/tree/main')`> = "''"

const email_str = foxp.putPrim('zzz.zzz@testmailreg.com')
const not_email_str = foxp.putPrim('https://github.com/taiyakihitotsu/foxp/tree/main')
const email = foxp.tid<foxp.pre.Email>()(email_str)
// @ts-expect-error:
const notemail = foxp.tid<foxp.pre.IsEmail>()(not_email_str)

describe("email", () => {
  it("", () => { expect(email.value).toBe('zzz.zzz@testmailreg.com') })
})
