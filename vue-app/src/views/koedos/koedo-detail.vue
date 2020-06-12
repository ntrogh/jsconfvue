<script>
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'KoedoDetail',
  props: {
    koedo: {
      type: Object,
      default() {},
    },
  },
  components: { ButtonFooter },
  data() {
    return {
      addMode: false,
      editingKoedo: { ...this.koedo },
    };
  },
  watch: {
    koedo() {
      if (this.koedo && this.koedo.id) {
        this.editingKoedo = { ...this.koedo };
        this.addMode = false;
      } else {
        this.editingKoedo = { id: undefined, name: '', description: '' };
        this.addMode = true;
      }
    },
  },
  methods: {
    clear() {
      this.$emit('unselect');
    },
    saveKoedo() {
      this.$emit('save', this.editingKoedo);
      this.clear();
    },
  },
};
</script>

<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">{{ editingKoedo.to }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingKoedo.id">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="99999"
            readonly
            type="text"
            v-model="editingKoedo.id"
          />
        </div>
        <div class="field">
          <label class="label" for="to">to</label>
          <input
            class="input"
            name="to"
            placeholder="Jane Doe"
            type="text"
            v-model="editingKoedo.to"
          />
        </div>
        <div class="field">
          <label class="label" for="message">message</label>
          <input
            class="input"
            name="message"
            placeholder="Thank you!"
            type="text"
            v-model="editingKoedo.message"
          />
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <ButtonFooter
        class="card-footer-item"
        label="Cancel"
        :className="'cancel-button'"
        :iconClasses="'fas fa-undo'"
        :item="editingKoedo"
        @clicked="clear"
      ></ButtonFooter>
      <ButtonFooter
        class="card-footer-item"
        :className="'save-button'"
        :iconClasses="'fas fa-save'"
        :item="editingKoedo"
        label="Save"
        @clicked="saveKoedo"
      ></ButtonFooter>
    </footer>
  </div>
</template>
