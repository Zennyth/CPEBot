class semesterMapper {
    static toDto (semesterModel) {
        return semesterModel != null ? {
            id: semesterModel.idsemester
        } : null;
    }

    static toModel (semesterDto) {
        return {
            idsemester: semesterDto.id
        }
    }
}

module.exports = semesterMapper;