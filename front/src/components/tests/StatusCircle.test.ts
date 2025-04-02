import { expect, test, describe } from 'vitest';
import StatusCircle from '../StatusCircle.vue';
import { mount } from '@vue/test-utils';

describe('StatusCircle component', () => {
  test('renders the correct status class active', () => {
    const wrapper = mount(StatusCircle, {
      props: {
        text: 'Active',
        status: 'active',
      },
    });
    const circle = wrapper.find('.circle');
    expect(circle.classes()).toContain('active');
  });

  test('renders the correct status class inactive', () => {
    const wrapper = mount(StatusCircle, {
      props: {
        text: 'Inactive',
        status: 'inactive',
      },
    });
    const circle = wrapper.find('.circle');
    expect(circle.classes()).toContain('inactive');
  });

  test('renders the correct name', () => {
    const wrapper = mount(StatusCircle, {
      props: {
        text: 'Active',
        status: 'active',
      },
    });
    const text = wrapper.find('.status-text');
    expect(text.text()).toBe('Active');
  });

  test('does not render text when no text prop is passed', () => {
    const wrapper = mount(StatusCircle, {
      props: {
        status: 'active',
      },
    });
    const text = wrapper.find('.status-text');
    expect(text.exists()).toBe(false);
  });
});
