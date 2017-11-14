package fi.luke.bma.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.Type;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity
public class Grid extends NonInsertableEntityWithLongId {

    public enum GridType {
        ONE_BY_ONE_KM(1), MUNICIPALITY(2), PROVINCE(3), DRAINAGE_BASIN(4), POST_NUMBER_AREA(5), ELY_CENTER(6),
        MUNICIPALITY_WITHOUT_SEA_AREA(7);

        private final int value;

        private GridType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    };

    @Column
    private String name;

    @Column
    @Type(type = "date")
    private Date startDate;

    @Column
    @Type(type = "date")
    private Date endDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
