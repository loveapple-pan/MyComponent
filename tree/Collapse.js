const Transition = {
  beforeEnter(el) {
    el.classList.add('collapse')
    if (!el.dateSet) {
      el.dateSet = {}
    }
    el.dateSet.paddingTop = el.style.paddingTop;
    el.dateSet.paddingBottom = el.style.paddingBottom;

    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },
  enter(el, done) {
    el.dateSet.overflow = el.style.overflow;
    el.style.height = el.scrollHeight + 'px';
    el.style.paddingBottom = el.dateSet.paddingBottom;
    el.style.paddingTop = el.dateSet.paddingTop;
    el.style.overflow = 'hidden';
  },
  afterEnter(el) {
    el.classList.remove('collapse');
    el.style.height = '';
    el.style.overflow = el.dateSet.overflow;
  },
  beforeLeave(el) {
    if (!el.dateSet) {
      el.dateSet = {};
    }
    el.dateSet.paddingBottom = el.style.paddingBottom;
    el.dateSet.paddingTop = el.style.paddingTop;
    el.dateSet.overflow = el.style.overflow;

    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'hidden';
  },
  leave(el, done) {
    if (el.style.height !== 0) {
      el.classList.add('collapse')
      el.style.height = 0;
      el.style.paddingBottom = 0;
      el.style.paddingTop = 0;
    }
    done()
  },
  afterLeave(el) {
    el.classList.remove('collapse');
    el.style.height = '';
    el.style.paddingBottom = el.dateSet.paddingBottom;
    el.style.paddingTop = el.dateSet.paddingTop;
    el.style.overflow = el.dateSet.overflow;
  }
}

export default {
  name: 'Collapse',
  render(h) {
    const data = {
      on: Transition
    }
    return h('transition', data)
  }
}
