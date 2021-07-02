class PromotionMapper {
    static toDto (promotion) {
        return {
            year: promotion.yearpromotion
        }
    }
}

module.exports = PromotionMapper;