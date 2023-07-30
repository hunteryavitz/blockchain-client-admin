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
        // Mock fetch with specific response
        const mockSuccessResponse = true;
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve(mockSuccessResponse)
        } as Response);
        global.fetch = () => mockFetchPromise;

        const wrapper = mount(ReadinessCheck)
        await wrapper.find('button').trigger('click')

        // Wait until DOM updates after fetch
        await wrapper.vm.$nextTick()

        const text = wrapper.text()
        expect(text.includes('System is ready.')).toBe(true)
    })

    it('shows "System is not ready" when fetch returns false', async () => {
        // Mock fetch with specific response
        const mockFailureResponse = false;
        const mockFetchPromise = Promise.resolve({
            json: () => Promise.resolve(mockFailureResponse)
        } as Response);
        global.fetch = () => mockFetchPromise;

        const wrapper = mount(ReadinessCheck)
        await wrapper.find('button').trigger('click')

        // Wait until DOM updates after fetch
        await wrapper.vm.$nextTick()

        const text = wrapper.text()
        expect(text.includes('System is not ready.')).toBe(true)
    })
})
