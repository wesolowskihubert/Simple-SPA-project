<?php

namespace App\Repository;


use App\Car;

class CarRepository {

    /** Method responsible for adding the car to DB
     *
     */
    public function store($name, $productionYear) {
        $car = new Car();
        $car->name = $name;
        $car->production_year = $productionYear;
        $car->save();

        return $car;
    }

    /** Method responsible for get list of all cars from DB
     *
    */
    public function index() {
        return Car::all();
    }

    /** Method responsible for find a car by specific id
     * @param $id
     * @return mixed
     */

    public function find($id) {
        return Car::find($id);
    }


    /** Method responsible for update a car
     *
     */
    public function update($car, $name, $productionYear) {
        $car->name = $name;
        $car->production_year = $productionYear;

        $car->save();
    }


    /** Method responsible for delete a car from DB
     *
     * @param $car
     */
    public function destroy($car) {
        $car->delete();
    }
}
