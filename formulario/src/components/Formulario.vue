<template>
  <main v-if="this.globalVar == 1">
    <div>
      <div class="boxFormulario">
        <h3 class="mb-5">Desafio </h3>
        <h4 class="mb-5 mt-5">Cássio Gomes do Nascimento</h4>
        <h4 class="mt-5">xpcassio@yahoo.com.br</h4>
        <form name="formFormulario" novalidate="">
          <div class="itemFormulario" v-for="(item, index) in fields.request_fields" :key="index">
            <label>{{ item.label }}</label>

            <!-- SELECT -->
            <div class="select" v-if="item.type == 'enumerable'">
              <select :name="item.name" :required="item.required">
                <option value="" selected="" disabled="">{{ item.placeholder }}</option>
                <option v-for="(itemOpc, indexOpc) in item.values" :key="indexOpc">{{ itemOpc }}</option>
              </select>
            </div>

            <!-- TEXTAREA -->
            <textarea rows="5" :name="item.name" :required="item.required" v-if="item.type == 'big_text'" :placeholder="item.placeholder"></textarea>

            <p class="p-requerido" v-if="item.required == true">* Este campo é requerido</p>
          </div>

          <button type="button" class="botaoProjeto" v-on:click="seguir()">Seguir</button>
        </form>
      </div>
    </div>
  </main>

  <main v-else>
    <div>
      <div class="boxFormulario">
        <form name="formCadastro" novalidate="">
          <h3 class="mb-5">Desafio </h3>
          <h4 class="mb-5 mt-5">Cássio Gomes do Nascimento</h4>
          <h4 class="mt-5">xpcassio@yahoo.com.br</h4>
          <div class="itemFormulario" v-for="(item, index) in fields.user_fields" :key="index">
            <label>{{ item.label }}</label>
            <div class="input">
              <input :type="item.type" :name="item.name" :required="item.required" :placeholder="item.placeholder">
            </div>
            <p class="p-requerido" v-if="item.required == true">* Este campo é requerido</p>
          </div>

          <button type="button" class="botaoProjeto mr-5" v-on:click="voltar()">Voltar</button>
          <button type="button" class="botaoProjeto" v-on:click="finalizar()">Finalizar</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      fields: {}
    }
  },
  beforeMount(){
    this.getFields();
  },
  methods: {
    async getFields(){
      const res = await fetch(window.location.origin+'/fields.json');
      const data = await res.json();
      this.fields = data._embedded;
    },
    seguir: function (){
      var elements = document.forms['formFormulario'].elements,
          tmp_seguir = true;

      for (var i=0; i < elements.length; i++){
        if (elements[i].name != '' && elements[i].required == true && elements[i].value == '')
          tmp_seguir = false;
      }
      
      if (!tmp_seguir)
        alert('Existe campos para serem selecionados!')
      else
        this.globalVar = 2;
    },
    voltar: function(){
      this.globalVar = 1;
    },
    finalizar: function(){
      var elements = document.forms['formCadastro'].elements,
          tmp_seguir = true;

      for (var i=0; i < elements.length; i++){
        if (elements[i].name != '' && elements[i].required == true && elements[i].value == '')
          tmp_seguir = false;
      }
      
      if (!tmp_seguir)
        alert('Existe campos para serem preenchidos!')
      else
        alert('Fim do projeto!');
    }
  }
}
</script>
