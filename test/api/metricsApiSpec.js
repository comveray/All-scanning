/*
 * Copyright (c) 2014-2020 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const frisby = require('frisby')
const API_URL = 'http://localhost:3000/metrics/'

describe('/metrics', () => {
  it('GET metrics via public API', () => {
    return frisby.get(API_URL)
      .expect('status', 200)
      .expect('header', 'content-type', /text\/plain/)
      .expect('bodyContains', /^.*_challenges_solved{difficulty="[1-6]",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_challenges_total{difficulty="[1-6]",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_orders_placed_total{app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_users_registered{type="standard",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_users_registered{type="deluxe",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_users_registered_total{app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_wallet_balance_total{app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_user_social_interactions{type="review",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_user_social_interactions{type="feedback",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^.*_user_social_interactions{type="complaint",app=".*"} [0-9]*$/gm)
      .expect('bodyContains', /^http_requests_count{status_code="[0-9]XX",app=".*"} [0-9]*$/gm)
  })
})
