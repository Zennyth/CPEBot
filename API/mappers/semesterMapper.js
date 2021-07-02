class semesterMapper {
    static toDto (semester) {
        return {
            id: semester.idsemester
        }
    }
}

module.exports = semesterMapper;