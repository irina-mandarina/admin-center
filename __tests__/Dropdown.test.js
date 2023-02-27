import { Dropdown } from "~~/.nuxt/components"
import { mount } from '@vue/test-utils'

test("Test for dropdown", () => {
    const wrapper = mount(Dropdown, {
        props: {
            name: "Basket",
            selectKey: "basket",
            options: ["apple", "pear", "orange"],
            displayOption: null
        }
    })
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('apple')
    expect(wrapper.emitted().find("Basket")).toBe(false)
})