<template>
  <transition @after-leave="afterLeave">
    <div class="actionsheet-overlay" v-if="showModal" @click="deactivate">
      <div class="actionsheet">
        <div class="actionsheet-group" v-for="(group, groupIndex) in groups">
          <div v-for="(button, index) in group" @click.stop.prevent="onClick(button, index, groupIndex)" :class="{'actionsheet-label': button.label, 'actionsheet-button': !button.label, 'actionsheet-button-color': button.color, 'actionsheet-button-bold': button.bold, 'actionsheet-button-disable': button.disable}">{{ button.text }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import defer from './defer.js';

export default {
  props: {
    buttons: [Array]
  },
  data: function(){
    return {
      showModal: false
    };
  },
  methods: {
    activate: function(){
      this._deferred = defer()
      this.showModal = true
      return this._deferred.promise
    },
    deactivate: function() {
      this.showModal = false
      this._deferred.reject()
    },
    onClick: function(button, selectedIndex, selectedGroupIndex){
      if(button.disable || button.label){
        return;
      }

      if(button.handle){
        button.handle({button, selectedIndex, selectedGroupIndex});
      }

      this._deferred.resolve({button, selectedIndex, selectedGroupIndex});
      this.showModal = false;
    },
    afterLeave: function(){
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  computed: {
    groups: function(){
      if(!this.buttons){
        return [];
      }

      return this.buttons.map(function(group){
        if(Object.prototype.toString.call(group) === '[object Object]'){
          return [group];
        }else{
          return group;
        }
      });
    }
  }
};
</script>

<style>
.actionsheet-overlay {
  color: #000;
  font-size: 14px;
  line-height: 1.4;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10600;
}
.actionsheet-overlay.v-enter{
  opacity: 0;
}
.actionsheet-overlay.v-enter-active{
  transition: opacity .4s;
}
.actionsheet-overlay.v-leave-active{
  opacity: 0;
  transition: opacity .4s;
}
.actionsheet-overlay *{
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

.actionsheet {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 11000;
  width: 100%;
  transform: translate3d(0,0,0);
  background: #FFF;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.actionsheet-overlay.v-enter .actionsheet {
  transform: translate3d(0,100%,0);
}
.actionsheet-overlay.v-enter-active .actionsheet {
  transition: transform .3s;
}
.actionsheet-overlay.v-leave-active .actionsheet {
  transform: translate3d(0,100%,0);
  transition: transform .4s;
}

.actionsheet-button, .actionsheet-label {
  width: 100%;
  text-align: center;
  font-weight: 400;
  margin: 0;
  box-sizing: border-box;
  display: block;
  position: relative;
}
.actionsheet-button:after, .actionsheet-label:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #0c0c0c1a;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
      -ms-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
}
.actionsheet-label {
  font-size: 1.2em;
  padding: 8px 10px;
  height: 50px;
  background: #00000003;
  color: #000;
  font-weight: 700;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
.actionsheet-button {
  cursor: pointer;
  line-height: 50px;
  font-size: 20px;
  min-height: 50px;
}
.actionsheet-button.actionsheet-button-color, .actionsheet-label.actionsheet-button-color{
  color: #ff3b30;
}
.actionsheet-button.actionsheet-button-bold, .actionsheet-label.actionsheet-button-bold{
  font-weight: bold;
}
.actionsheet-button.actionsheet-button-disable, .actionsheet-label.actionsheet-button-disable{
  /*opacity: 0.95;*/
  color: #8e8e93;
}
.actionsheet-button:first-child, .actionsheet-label:first-child {
  border-radius: 4px 4px 0 0;
}
.actionsheet-button:last-child, .actionsheet-label:last-child {
  border-radius: 0 0 4px 4px;
}
.actionsheet-button:last-child:after, .actionsheet-label:last-child:after{
  display: none;
}
.actionsheet-button:first-child:last-child, .actionsheet-label:first-child:last-child {
  border-radius: 4px;
}
</style>
