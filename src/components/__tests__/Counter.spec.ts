import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Counter from '../Counter.vue'

describe('Counter.vue', () => {
    it('increments count when button is clicked', async () => {
        const wrapper = mount(Counter)
        await wrapper.find('button').trigger('click')

        // Wait until DOM updates after click
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Count: 1')
    })
})
