
module.exports = ({ db }) => {

  return {
    get: async ({ contributionId }) => {
      try {
        const contribution = await db.Contribution.findById(contributionId)
        if (contribution) {
          return { ok: true, success: true, status: 200, contribution }
        }
      } catch (e) {
        return { ok: false, success: false, status: 500, comment: 'Error on get contribution action ' + e.toString() }
      }
    }
  }
}