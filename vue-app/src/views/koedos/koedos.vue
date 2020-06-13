<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import KoedoDetail from './koedo-detail.vue';
import KoedoList from './koedo-list.vue';

const captains = console;

export default {
  name: 'Koedos',
  data() {
    return {
      errorMessage: '',
      message: '',
      koedoToDelete: null,
      routePath: '/koedos',
      selected: null,
      showModal: false,
      title: 'My Koedos',
    };
  },
  components: {
    ListHeader,
    KoedoList,
    KoedoDetail,
    Modal,
  },
  async created() {
    await this.getKoedos();
  },
  computed: {
    ...mapGetters('koedos', { koedos: 'koedos' }),
  },
  methods: {
    ...mapActions('koedos', [
      'getKoedosAction',
      'deleteKoedoAction',
      'addKoedoAction',
      'updateKoedoAction',
    ]),
    askToDelete(koedo) {
      this.koedoToDelete = koedo;
      this.showModal = true;
      if (this.koedoToDelete.to) {
        this.message = `Would you like to delete the Koedo for ${this.koedoToDelete.to}?`;
        captains.log(this.message);
      }
    },
    clear() {
      this.selected = null;
    },
    closeModal() {
      this.showModal = false;
    },
    deleteKoedo() {
      this.closeModal();
      if (this.koedoToDelete) {
        captains.log(
          `You said you want to delete the Koedo for ${this.koedoToDelete.to}`,
        );
        this.deleteKoedoAction(this.koedoToDelete);
      }
      this.clear();
    },
    enableAddMode() {
      this.selected = {};
    },
    async getKoedos() {
      this.errorMessage = undefined;
      try {
        await this.getKoedosAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
      this.clear();
    },
    save(koedo) {
      let newKoedo;
      captains.log('koedo changed', koedo);
      if (koedo.id) {
        this.updateKoedoAction(koedo);
      } else {
        newKoedo = koedo;
        newKoedo.date = Date.now();
        this.addKoedoAction(newKoedo);
      }
    },
    select(koedo) {
      this.selected = koedo;
    },
  },
};
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getKoedos"
      @add="enableAddMode"
      :routePath="routePath"
    >
    </ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="koedos">
        <KoedoList
          v-if="!selected"
          :koedos="koedos"
          :errorMessage="errorMessage"
          @selected="select($event)"
          @deleted="askToDelete($event)"
        ></KoedoList>
        <KoedoDetail
          v-if="selected"
          :koedo="selected"
          @unselect="clear"
          @save="save"
        ></KoedoDetail>
      </div>
    </div>

    <Modal
      class="modal-product"
      :message="message"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteKoedo"
    ></Modal>
  </div>
</template>
