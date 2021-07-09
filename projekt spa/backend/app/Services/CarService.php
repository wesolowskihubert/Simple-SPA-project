<?php

namespace App\Services;


use App\Car;
use App\Repository\CarRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class CarService {

    private $carRepository;

    public function __construct(CarRepository $carRepository) {
        $this->carRepository = $carRepository;
    }

    /**
     * @return Car[]|Collection
     */

    public function getCars() {
        return $this->carRepository->index();
    }

    /**
     * @param $name
     * @param $productionYear
     * @return bool
     */

    public function addCar($name, $productionYear) {
        $this->carRepository->store($name, $productionYear);
        return true;
    }

    /**
     * @param $id
     * @param $name
     * @param $productionYear
     * @return bool
     * @throws Exception
     */

    public function updateCar($id, $name, $productionYear) {
        $car = $this->carRepository->find($id);
        if(!$car) throw new Exception('Car not found');
        $this->carRepository->update($car, $name, $productionYear);

        return true;
    }

    /**
     * @param $id
     * @return mixed
     * @throws Exception
     */

    public function deleteCar($id) {
     $car = $this->carRepository->find($id);
     if(!$car) throw new Exception('Car not found');
     $this->carRepository->destroy($car);
     return true;
    }
}
