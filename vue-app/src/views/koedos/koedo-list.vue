<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';

const captains = console;

export default {
  name: 'KoedoList',
  props: {
    koedos: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  methods: {
    deleteKoedo(koedo) {
      this.$emit('deleted', koedo);
      captains.log(`You tried to delete ${koedo.to}`);
    },
    selectKoedo(koedo) {
      captains.log(`You tried to select ${koedo.to}`);
      this.$emit('selected', koedo);
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!koedos.length && !errorMessage">
      Loading data ...
    </div>
    <ul class="list">
      <li
        v-for="(koedo, index) in koedos"
        :key="koedo.id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :to="koedo.to"
            :message="koedo.message"
            :date="koedo.date"
            :imageurl="koedo.imageurl"
          />
          <footer class="card-footer">
            <ButtonFooter
              class="delete-item"
              iconClasses="fas fa-trash"
              @clicked="deleteKoedo"
              label="Delete"
              :dataIndex="index"
              :dataId="koedo.id"
              :item="koedo"
            />
            <ButtonFooter
              class="edit-item"
              iconClasses="fas fa-edit"
              @clicked="selectKoedo"
              label="Edit"
              :dataIndex="index"
              :dataId="koedo.id"
              :item="koedo"
            />
          </footer>
        </div>
      </li>
    </ul>
  </div>
</template>
