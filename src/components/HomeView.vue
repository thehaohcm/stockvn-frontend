<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <NavBar />

    <div class="container mt-4 flex-grow-1">
      <div class="row justify-content-center">
        <!-- <div class="col-md-8"> -->
        <div class="card">
          <div class="card-header bg-secondary text-white" style="text-align: center;">
            <h5 class="mb-0">Vietnam Stock Evaluator</h5>
          </div>
          <div class="card-body" style="text-align: center;">
            <div v-if="selectedStock !== null && selectedStock.code !== ''">
              <iframe :src="`https://stockchart.vietstock.vn/?stockcode=${selectedStock.code}`" width="100%"
                height="500px"></iframe>
              <div v-if="isLoading" class="d-flex justify-content-center">
                <div class="spinner"></div>
              </div>
            </div>
            <hr />
            <h5 class="mb-0">Potential symbols</h5>
            <div class="card-body">
              <div class="mb-2" v-if="potentialStocks.data && potentialStocks.data.length > 0">
                <input type="text" v-model="filterText" placeholder="Filter symbols..." class="form-control" style="width: 50%; margin: 0 auto;" />
              </div>
              <div v-if="potentialStocks.latest_updated" style="text-align: right; font-weight: bold;">
                <strong>Last Updated:</strong> {{ formatDate(potentialStocks.latest_updated) }}
              </div>
              <table class="table table-striped" style="margin: 0 auto;">
                <tbody>
                  <tr v-for="stock in filteredPotentialStocks" :key="stock.symbol"
                    @click="$nextTick(() => { selectedStock = { code: stock.symbol }; });" style="cursor: pointer;"
                    :class="{ 'highlighted-row': selectedStock && selectedStock.code === stock.symbol }">
                    <td style="text-align: left; width: 1%;">
                      <input type="checkbox" @click="toggleStock(stock.symbol)">
                    </td>
                    <td :title="`Click to see more the ${stock.symbol} info...`">{{ stock.symbol }}</td>
                  </tr>
                </tbody>
              </table>

              <button v-if="!loadingPotentialStocks && !startScanning" @click="startScanningStocks"
                class="btn btn-success">Start to
                scan...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  <AppFooter />
</template>

<script>
import NavBar from './NavBar.vue';
import AppFooter from './AppFooter.vue';
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'StockVn',
  components: {
    NavBar,
    AppFooter,
  },
  props: {
    searchText: String,
  },
  emits: ['update:searchText', 'update:selectedStock', 'update:stocks'],
  setup(props, { emit }) {
    const isMenuOpen = ref(false);
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const userInfo = ref(null);
    const selectedStock = ref(null);
    const stocks = ref([]);
    const potentialStocks = ref({}); // Changed to object
    const loadingPotentialStocks = ref(false);
    const startScanning = ref(false);
    const selectedStocks = ref([]); // Store selected stocks and initialize as an empty array
    const isLoading = ref(false);
    const filterText = ref(''); // Add filterText

    const filteredPotentialStocks = computed(() => {
      if (!filterText.value) {
        return potentialStocks.value.data || [];
      }
      return (potentialStocks.value.data || []).filter(stock =>
        stock.symbol.toLowerCase().includes(filterText.value.toLowerCase())
      );
    });

    onMounted(async () => {
      const response = await fetch('https://api-finfo.vndirect.com.vn/v4/stocks?q=type:STOCK~status:LISTED&fields=code&size=3000');
      const data = await response.json();
      stocks.value = data.data;
      selectedStock.value={code:"VNINDEX"}
      emit('update:stocks', stocks.value);
      fetchStocks();
    });

    const startScanningStocks = () => {
      startScanning.value = true;
      fetchPotentialStocks();
    }

    const isLoggedIn = computed(() => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const loggedIn = userInfo && userInfo.custodyCode;
        return loggedIn;
      } catch (error) {
        console.error('Error parsing userInfo:', error);
        return false; // Return false if parsing fails
      }
    });

    const toggleStock = (symbol) => {
      const index = selectedStocks.value.indexOf(symbol);
      if (index > -1) {
        selectedStocks.value.splice(index, 1); // Remove if exists
      } else {
        selectedStocks.value.push(symbol); // Add if doesn't exist
      }
    };

    const onStockSelected = (value) => {
      emit('update:selectedStock', value);
    };


    const filterOptions = (options, search) => {
      if (!search) {
        return options
      }
      return options.filter((option) =>
        option.code.toLowerCase().includes(search.toLowerCase())
      )
    }

    const fetchPotentialStocks = async () => {
      loadingPotentialStocks.value = true;
      isLoading.value = true;
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/getPotentialSymbols`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        potentialStocks.value = data; // Assign directly
      } catch (error) {
        console.error('Error fetching potential stocks:', error);
        potentialStocks.value = {}; // Clear the list on error
      } finally {
        loadingPotentialStocks.value = false;
        isLoading.value = false;
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const fetchStocks = async () => {
      const response = await fetch('https://api-finfo.vndirect.com.vn/v4/stocks?q=type:STOCK~status:LISTED&fields=code&size=3000');
      const data = await response.json();
      stocks.value = data.data;
    };

    return {
      selectedStock,
      stocks,
      onStockSelected,
      filterOptions,
      formatNumber,
      potentialStocks,
      loadingPotentialStocks,
      startScanningStocks,
      formatDate,
      toggleStock,
      isLoggedIn,
      isLoading,
      toggleMenu,
      isMenuOpen,
      userInfo,
      filterText, // Return filterText
      filteredPotentialStocks, // Return filteredPotentialStocks
    };
  },
};

const formatNumber = (number) => {
  if (number === null || number === undefined) {
    return 'N/A';
  }
  return number.toLocaleString() + ' VND';
}
</script>

<style scoped>
/* Add component-specific styles here */
.tr-stockvn {
  font-weight: bold;
  text-align: left;
}

td:nth-child(1) {
  text-align: left;
}

.highlighted-row {
  background-color: #f0f0f0; /* Light gray background */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
