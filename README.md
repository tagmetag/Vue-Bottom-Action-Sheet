pull-to-fix-vue-components

# Mobile components
1. Action Sheet
Prototype
`this.$actionSheet({
  text: 'Confirm log out?',
  label: true
}, [{ text: 'Log out' }, { text: 'Cancel', }]).then(({button, selectedIndex, selectedGroupIndex}) => {
  if (selectedIndex === 0) {
    console.log('Handle Log out')
  } else {
    console.log('Cancel')
  }
}).catch(_ => {
  console.log('Click outside')
})`
