<?php

namespace App\Http\Controllers;

use App\Services\CarService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CarController extends Controller
{

    private $carService;

    public function __construct(carService $carService)
    {
        $this->carService = $carService;
    }


    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws Exception
     */
    public function index()
    {
        try {
              $response = $this->carService->getCars();
        } catch (Exception $exception) {
            throw new Exception;
        }
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function store(Request $request)
    {
        try {
            if (!$request->has('name') || $request->get('name') == null) {
                throw new Exception('Missing parameter: name');
            }

            if (!$request->has('productionYear') || $request->get('productionYear') == null) {
                throw new Exception('Missing parameter: productionYear');
            }

            $response = $this->carService->addCar($request->get('name'), $request->get('productionYear'));
        } catch (Exception $exception) {
            throw $exception;
        }
        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * @throws Exception
     */
    public function update(Request $request, $id)
    {
        try {
            if (!$request->has('name') || $request->get('name') == null) {
                throw new Exception('Missing parameter: name');
            }
            if (!$request->has('productionYear') || $request->get('productionYear') == null) {
                throw new Exception('Missing parameter: productionYear');
            }
            $response = $this->carService->updateCar($id, $request->get('name'), $request->get('productionYear'));
        } catch(Exception $exception) {
            throw $exception;
        }
        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy($id)
    {
       try {
           $response = $this->carService->deleteCar($id);
       } catch (Exception $exception) {
           throw $exception;
       }
       return response()->json($response, 200);
    }
}
