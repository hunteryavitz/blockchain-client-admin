import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ReadinessCheck from '../ReadinessCheck.vue'


describe('ReadinessCheck.vue', () => {
    it('shows error message when fetch fails', async () => {
        global.fetch = () => Promise.reject(new Error('Fetch failed'))

        const wrapper = mount(ReadinessCheck)
        await wrapper.find('button').trigger('click')

        // Wait until DOM updates after fetch
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('Error occurred while fetching readiness status.')
    })

    it('shows "System is ready" when fetch returns true', async () => {
        global.fetch = () => Promise.resolve({
            json: () => Promise.resolve(true)
        })

        const wrapper = mount(ReadinessCheck)
        await wrapper.find('button').trigger('click')

        // Wait until DOM updates after fetch
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('System is ready.')
    })

    it('shows "System is not ready" when fetch returns false', async () => {
        global.fetch = () => Promise.resolve({
            json: () => Promise.resolve(false)
        })

        const wrapper = mount(ReadinessCheck)
        await wrapper.find('button').trigger('click')

        // Wait until DOM updates after fetch
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('System is not ready.')
    })
})
