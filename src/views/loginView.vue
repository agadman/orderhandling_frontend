<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-8">Wellory Inventory</h1>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder=""
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder=""
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Sign in
        </button>
      </form>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''

      try {
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', 
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          this.error = data.message || 'Login failed'
          return
        }

        this.$router.push('/dashboard')
      } catch (err) {
        this.error = 'Could not reach server'
        console.error(err)
      }
    }
  }
}
</script>