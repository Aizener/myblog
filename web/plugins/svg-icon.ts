const ctx = require.context('@/assets/icons', false, /\.svg$/)

const requireAll = (requireContext:__WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
requireAll(ctx)
