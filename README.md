## VueJS Pull-to-fix components

> Some sample components built using Vue.js for pull to fix

# Mobile components

## 1. Action Sheet
# screenshot
![screenshot](./ActionSheet/demo-actionsheet.gif)

### Usage
``` html
this.$actionSheet({
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
})
```
